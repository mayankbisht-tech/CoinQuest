const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  // --- CHANGE IS HERE: Destructure 'role' from the request body ---
  const { email, password, role } = req.body;

  try {
    // Security check: Only allow 'voter' or 'participant' roles from this public endpoint.
    // Admin creation should be handled by a separate, protected endpoint.
    if (role && !['voter', 'participant'].includes(role)) {
        return res.status(400).json({ message: "Invalid role specified." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // --- CHANGE IS HERE: Pass the 'role' when creating a new user ---
    // If no role is provided, the model's default ('voter') will be used.
    const user = new User({ email, password, role });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
        success: true,
        message: "User registered successfully.",
        token: `Bearer ${token}`,
        user: user
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});


// Login a user (This remains unchanged)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ 
        success: true,
        message: "Logged in successfully.",
        token: `Bearer ${token}`,
        user: user 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;