const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/examDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Routes
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const resultRoutes = require("./routes/result"); // ✅ added

app.use("/api", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", resultRoutes); // ✅ added

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});