const express = require("express");
const authMiddleware = require("./middleware/authMiddleware.cjs");
const router = express.Router();
const prisma = require("./prisma.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("./middleware/avatarMiddleware.cjs")

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
    if (!req.file) {
        return res.status(400).json({
            message: "File not uploaded"
        });
    }
    const avatar = req.file.filename;

    await prisma.user.update({
      where: {
          id: req.user.id,
      },
      data: {
          avatar,
      },
    });

    res.json({
      message: "Avatar updated",
      avatar: `/uploads/${req.file.filename}`
    });
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
