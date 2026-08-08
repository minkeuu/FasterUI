const express = require("express");
const authMiddleware = require("./middleware/authMiddleware.cjs");
const router = express.Router();
const prisma = require("./prisma.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer"); 
const supabase = require("@supabase/supabase-js")
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.get("/", authMiddleware, async(req,res)=>{

  const user = await prisma.user.findUnique({
      where: {
          id: req.user.id,
      },
      select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
      },
  });

  if (!user) {
      return res.status(404).json({
          message: "User not found",
      });
  }

  res.json(user);

});

router.put("/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({
              message: "File not uploaded"
          });
      }

      const extension = req.file.originalname
          .split(".")
          .pop()
          .toLowerCase();

      const fileName = `${req.user.id}-${Date.now()}.${extension}`;

      const { error } = await supabase.storage
          .from("avatars")
          .upload(fileName, req.file.buffer, {
              contentType: req.file.mimetype,
              upsert: true
          });

      if (error) {
          console.error("Supabase Storage error:", error);

          return res.status(500).json({
              message: "Failed to upload avatar"
          });
      }

      const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

      const avatarUrl = data.publicUrl;

      await prisma.user.update({
          where: {
              id: req.user.id
          },
          data: {
              avatar: avatarUrl
          }
      });

      res.json({
          message: "Avatar updated",
          avatar: avatarUrl
      });

  } catch (error) {
      console.error("Avatar error:", error);

      res.status(500).json({
          message: "Server error"
      });
  }
}
);


router.put("/name", authMiddleware, async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Name not found"
        });
    }
    const name = req.body.name;

    await prisma.user.update({
      where: {
          id: req.user.id,
      },
      data: {
          name,
      },
    });

    res.json({
      message: "Name updated",
      name: `${name}`
    });
  }
);

router.put("/password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Password fields required"
    });
  }

  const user = await prisma.user.findUnique({
      where: {
          id: req.user.id,
      },
  });

    const isMatch = await bcrypt.compare(
  currentPassword,
  user.passwordHash
);

  if (!isMatch) {
    return res.status(400).json({
      message: "Старый пароль неверный"
    });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
      where: {
          id: req.user.id,
      },
      data: {
          passwordHash: hash,
      },
  });

  res.json({
    message: "Password updated"
  });
});

module.exports = router;
