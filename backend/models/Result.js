const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    username: String,
    score: Number,
    answers: Object,
    status: {
        type: String,
        default: "pending" // pending → evaluated
    }
});

module.exports = mongoose.model("Result", resultSchema);