const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

module.exports = router;