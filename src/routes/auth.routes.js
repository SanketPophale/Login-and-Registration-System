const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models"); // Assuming you have a User model
const router = express.Router();


// Middleware for Protected Routes
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization"); // Look for the token in the Authorization header

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        req.user = decoded.userId; // Save user ID to request object
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Token Error:", error);
        return res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = authMiddleware;

// Register Route
router.post("/register", async (req, res) => {
    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists!" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        dob,
    });

    await newUser.save();

    console.log("User Registered:", newUser);
    return res.status(201).json({ message: "User registered successfully!", user: newUser });
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save logged-in user in the database (you can create a session storage)
        await User.findByIdAndUpdate(user._id, { isLoggedIn: true });

        return res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: { id: user._id, name: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again later." });
    }
});

// Get all logged-in users
router.get("/logged-in-users", async (req, res) => {
    try {
        const users = await User.find({ isLoggedIn: true }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


module.exports = router;
