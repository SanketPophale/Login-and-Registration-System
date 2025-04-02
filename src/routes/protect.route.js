const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const User = require("../models/user.models");


const router = express.Router();

// Get all logged-in users (Protected)
router.get("/protected", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

const jwt = require("jsonwebtoken");

// After successful login/signup
const token = jwt.sign(
    { userId: user._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
);

// ✅ Send token in response
res.status(200).json({
    message: "Login successful",
    token,  // 🔹 Sending the token to the frontend
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
});

module.exports = router;