const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  addMember
} = require("../controllers/projectController");

const verifyToken = require("../middleware/authMiddleware");

// 🔹 Create Project
router.post("/create", verifyToken, createProject);

// 🔹 Get All Projects
router.get("/", verifyToken, getProjects);

// 🔹 Add Member
router.post("/add-member", verifyToken, addMember);

module.exports = router;