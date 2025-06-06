const express = require("express");
const router = express.Router();
const User = require("../models/user");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
