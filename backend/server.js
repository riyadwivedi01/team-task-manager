const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes import
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

// 🔌 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔐 Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// 🔐 JWT Middleware (FIXED)
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 🔥 Bearer remove
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔒 Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});