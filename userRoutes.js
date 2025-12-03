const express = require('express');
const User = require('./User');
const router = express.Router();

// Register - Save user to MongoDB
router.post("/register", async (req, res) => {
    try {
        // Input validation
        const { firstname, lastname, email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Password length validation
        if (password.length < 3) {
            return res.status(400).json({ message: "Password must be at least 3 characters long" });
        }
        
        const user = await User.create(req.body);
        res.json({ message: "User registered successfully", user });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Registration error:", err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

// Login - Authenticate user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({ 
            message: "Login successful", 
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from response
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
