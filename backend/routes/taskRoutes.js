const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateStatus,
  deleteTask
} = require("../controllers/taskController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/create", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.put("/update-status", verifyToken, updateStatus);
router.delete("/delete/:id", verifyToken, deleteTask);
module.exports = router;