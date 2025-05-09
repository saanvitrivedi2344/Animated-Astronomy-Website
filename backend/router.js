import dotenv from "dotenv";
import express from "express";
import User from "./User.js";

dotenv.config();

const router = express.Router();

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", async (req, res) => {  // Fixed: Added leading slash
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check if user already exists (single query for both checks)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return res.status(400).json({ msg: `${field} already exists` });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // Note: You should hash this before saving!
    });

    // Save user to database
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" }); // Changed to .json() for consistency
  }
});

export default router;