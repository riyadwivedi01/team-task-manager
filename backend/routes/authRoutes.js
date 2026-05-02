const express = require("express");
const router = express.Router();

// controllers
const { signup, login, getAllUsers } = require("../controllers/authController");

// 🔥 IMPORTANT: direct import (NO {})
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

// protected route
router.get("/users", verifyToken, getAllUsers);

module.exports = router;