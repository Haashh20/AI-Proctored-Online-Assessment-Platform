const express = require("express");
const router = express.Router();
const Result = require("../models/Result");


// ✅ SAVE RESULT (with dynamic status support)
router.post("/submit", async (req, res) => {
    const { username, score, answers, status } = req.body;

    try {
        const newResult = new Result({
            username,
            score,
            answers,
            status: status || "pending" // 🔥 FIXED HERE
        });

        await newResult.save();

        res.json({ message: "Submitted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving result" });
    }
});


// ✅ DYNAMIC LEADERBOARD (Top 20% OR min 5 users)
router.get("/leaderboard", async (req, res) => {
    try {
        const allUsers = await Result.find({ status: "evaluated" })
            .sort({ score: -1 });

        const total = allUsers.length;

        let limit = Math.floor(total * 0.2);

        if (limit < 5) limit = 5;

        const topUsers = allUsers.slice(0, limit);

        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaderboard" });
    }
});


// ✅ ADMIN: EVALUATE RESULTS
router.get("/evaluate", async (req, res) => {
    try {
        await Result.updateMany(
            { status: "pending" },
            { $set: { status: "evaluated" } }
        );

        res.json({ message: "All results evaluated" });
    } catch (error) {
        res.status(500).json({ message: "Evaluation failed" });
    }
});


// ✅ GET SINGLE USER RESULT (for dashboard)
router.get("/myresult/:username", async (req, res) => {
    try {
        const user = await Result.findOne({ username: req.params.username });

        if (!user) {
            return res.json({ message: "No result found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching result" });
    }
});


// ✅ GET USER RANK
router.get("/rank/:username", async (req, res) => {
    try {
        const users = await Result.find({ status: "evaluated" })
            .sort({ score: -1 });

        const total = users.length;

        const index = users.findIndex(
            u => u.username === req.params.username
        );

        if (index === -1) {
            return res.json({ message: "User not found" });
        }

        res.json({
            rank: index + 1,
            total
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching rank" });
    }
});


module.exports = router;