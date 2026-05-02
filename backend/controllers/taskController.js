// const Task = require("../models/Task");

// // Create Task
// exports.createTask = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can create tasks" });
//     }

//     const { title, description, projectId, assignedTo } = req.body;

//     const task = new Task({
//       title,
//       description,
//       project: projectId,
//       assignedTo
//     });

//     await task.save();

//     res.json({ message: "Task created", task });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get Tasks
// exports.getTasks = async (req, res) => {
//   try {

//     const tasks = req.user.role === "admin"
//       ? await Task.find()
//           .populate("assignedTo", "name email")
//           .populate("project", "name")
//       : await Task.find({ assignedTo: req.user.id })
//           .populate("assignedTo", "name email")
//           .populate("project", "name");

//     res.json(tasks);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update Status
// exports.updateStatus = async (req, res) => {
//   try {
//     const { taskId, status } = req.body;

//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { status },
//       { new: true }
//     );

//     res.json({
//       message: "Status updated",
//       task
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// // Delete Task
// exports.deleteTask = async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Task = require("../models/Task");

// 🔹 CREATE TASK (ONLY ADMIN)
exports.createTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create tasks" });
    }
console.log("REQ BODY:", req.body);
    const { title, description, projectId, assignedTo,dueDate } = req.body;

    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo,
      dueDate
    });

    await task.save();

    res.json({ message: "Task created", task });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 GET TASKS (ROLE BASED)
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("assignedTo", "name email")
        .populate("project", "name");
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 UPDATE STATUS (ADMIN OR OWNER)
exports.updateStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 permission check
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json({ message: "Status updated", task });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 DELETE TASK (ONLY ADMIN)
exports.deleteTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete tasks" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};