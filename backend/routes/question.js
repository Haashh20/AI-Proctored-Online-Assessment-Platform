const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get random questions
router.get("/questions", async (req, res) => {
    try {
        const questions = await Question.aggregate([
            { $sample: { size: 10 } } // 🔥 random 10 questions
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions" });
    }
});
router.get("/questions/softskills", async (req, res) => {

    const questions = await Question.aggregate([
        {
            $match: {
                section: "Soft Skills"
            }
        },
        {
            $sample: {
                size: 10
            }
        }
    ]);

    res.json(questions);
});
// ✅ TECHNICAL RANDOM QUESTIONS
router.get("/questions/technical", async (req, res) => {

    try {

        const questions = await Question.aggregate([

            {
                $match: {
                    section: "Technical Skills"
                }
            },

            {
                $sample: {
                    size: 15
                }
            }

        ]);

        res.json(questions);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error loading technical questions"
        });
    }
});
module.exports = router;