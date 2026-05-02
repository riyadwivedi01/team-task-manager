// const Project = require("../models/Project");

// // 🔹 Create Project
// exports.createProject = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const project = new Project({
//       name,
//       description,
//       owner: req.user.id,
//       members: [req.user.id]
//     });

//     await project.save();

//     res.status(201).json({
//       message: "Project created",
//       project
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🔹 Get All Projects (Dashboard)
// exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({
//       members: req.user.id
//     }).populate("owner members", "name email");

//     res.json(projects);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🔹 Add Member to Project
// exports.addMember = async (req, res) => {
//   try {
//     const { projectId, userId } = req.body;

//     const project = await Project.findById(projectId);

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     // Only owner (admin) can add members
//     if (project.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // avoid duplicate
//     if (!project.members.includes(userId)) {
//       project.members.push(userId);
//     }

//     await project.save();

//     res.json({
//       message: "Member added",
//       project
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Project = require("../models/Project");
const Task = require("../models/Task");


// 🔹 CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id] // creator default member
    });

    await project.save();

    res.status(201).json({
      message: "Project created",
      project
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 GET PROJECTS (🔥 FINAL LOGIC)
exports.getProjects = async (req, res) => {
  try {

    // 👑 ADMIN → sab projects
    if (req.user.role === "admin") {
      const projects = await Project.find()
        .populate("owner members", "name email");

      return res.json(projects);
    }

    // 👤 MEMBER → sirf assigned tasks ke projects
    const tasks = await Task.find({ assignedTo: req.user.id });

    const projectIds = tasks.map(t => t.project);

    const projects = await Project.find({
      _id: { $in: projectIds }
    }).populate("owner members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 ADD MEMBER TO PROJECT
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔐 only owner can add
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // avoid duplicate
    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json({
      message: "Member added",
      project
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};