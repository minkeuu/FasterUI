const express = require("express");
const authMiddleware = require("./middleware/authMiddleware.cjs");
const router = express.Router();
const prisma = require("./prisma.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("./middleware/avatarMiddleware.cjs")

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // Проверяем, есть ли уже пользователь
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Пользователь уже существует",
        });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            passwordHash: hash,
        },
    });

    res.json({
        message: "OK",
    });
});

router.post("/login", async (req,res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }
    const validPassword = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!validPassword) {
        return res.status(400).json({
            message: "Wrong password"
        });
    }


    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );


    res.json({
        token
    });
})

module.exports = router;