


// const API = "http://localhost:5000";

// // 🔐 LOGIN
// async function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch(`${API}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await res.json();

//   if (data.token) {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("role", data.role);
//     window.location.href = "dashboard.html";
//   } else {
//     alert("Login failed");
//   }
// }

// // 📌 LOAD USERS (task assign)
// async function loadUsers() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/api/auth/users`, {
//     headers: { Authorization: "Bearer " + token }
//   });

//   const users = await res.json();

//   const select = document.getElementById("assignUser");
//   if (!select) return;

//   select.innerHTML = "";

//   users.forEach(u => {
//     const option = document.createElement("option");
//     option.value = u._id;
//     option.text = `${u.name} (${u.role})`;
//     select.appendChild(option);
//   });
// }

// // 📌 LOAD USERS FOR MEMBER
// async function loadUsersForMember() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/api/auth/users`, {
//     headers: { Authorization: "Bearer " + token }
//   });

//   const users = await res.json();

//   const select = document.getElementById("memberSelect");
//   if (!select) return;

//   select.innerHTML = "";

//   users.forEach(u => {
//     const option = document.createElement("option");
//     option.value = u._id;
//     option.text = `${u.name} (${u.role})`;
//     select.appendChild(option);
//   });
// }

// // 📌 LOAD PROJECT DROPDOWN
// async function loadProjectDropdown() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/api/projects`, {
//     headers: { Authorization: "Bearer " + token }
//   });

//   const projects = await res.json();

//   const select = document.getElementById("projectSelect");
//   if (!select) return;

//   select.innerHTML = "";

//   projects.forEach(p => {
//     const option = document.createElement("option");
//     option.value = p._id;
//     option.text = p.name;
//     select.appendChild(option);
//   });
// }

// // 📌 CREATE PROJECT
// async function createProject() {
//   const input = document.getElementById("projectName");
//   const name = input.value;
//   const token = localStorage.getItem("token");

//   await fetch(`${API}/api/projects/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token
//     },
//     body: JSON.stringify({ name })
//   });

//   input.value = "";
//   loadProjects();
//   loadProjectDropdown();
// }

// // 📌 LOAD PROJECTS
// async function loadProjects() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/api/projects`, {
//     headers: { Authorization: "Bearer " + token }
//   });

//   const data = await res.json();

//   const list = document.getElementById("projects");
//   if (!list) return;

//   list.innerHTML = "";

//   data.forEach(p => {
//     const li = document.createElement("li");

//     li.innerHTML = `
//       <div class="task-row">
//         <span>${p.name}</span>
//       </div>
//     `;

//     list.appendChild(li);
//   });
// }

// // 📌 ADD MEMBER
// async function addMember() {
//   const projectId = document.getElementById("projectSelect").value;
//   const userId = document.getElementById("memberSelect").value;
//   const token = localStorage.getItem("token");

//   await fetch(`${API}/api/projects/add-member`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token
//     },
//     body: JSON.stringify({ projectId, userId })
//   });

//   alert("Member added");
// }

// // 📌 CREATE TASK
// async function createTask() {
//   const titleInput = document.getElementById("taskTitle");
//   const descInput = document.getElementById("taskDesc");

//   const title = titleInput.value;
//   const description = descInput.value;
//   const assignedTo = document.getElementById("assignUser").value;
//   const projectId = document.getElementById("projectSelect").value;

//   const token = localStorage.getItem("token");
  
//   await fetch(`${API}/api/tasks/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token
//     },
//     body: JSON.stringify({
//       title,
//       description,
//       projectId,
//       assignedTo
//     })
//   });

//   titleInput.value = "";
//   descInput.value = "";

//   loadTasks();
// }

// // 📌 LOAD TASKS (ROLE BASED FIX 🔥)
// async function loadTasks() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API}/api/tasks`, {
//     headers: { Authorization: "Bearer " + token }
//   });

//   const data = await res.json();

//   const list = document.getElementById("tasks");
//   if (!list) return;

//   list.innerHTML = "";

//   const role = localStorage.getItem("role");

//   // 🔥 user id निकाल रहे (JWT से)
//   const payload = JSON.parse(atob(token.split(".")[1]));
//   const currentUserId = payload.id;

//   data.forEach(t => {
//     const li = document.createElement("li");

//     const isAdmin = role === "admin";
//     const isOwner = t.assignedTo?._id === currentUserId;

//     li.innerHTML = `
//       <div class="task-row">
//         <span class="${t.status === "completed" ? "completed" : ""}">
//           ${t.title} - ${t.status}
//           <br>
//           <small>Assigned: ${t.assignedTo?.name || "N/A"}</small>
//         </span>

//         <div class="btn-group">

//           ${
//             (isAdmin || isOwner) && t.status !== "completed"
//               ? `<button onclick="markDone('${t._id}')">Done</button>`
//               : ""
//           }

//           ${
//             isAdmin
//               ? `<button onclick="deleteTask('${t._id}')" class="delete-btn">Delete</button>`
//               : ""
//           }

//         </div>
//       </div>
//     `;

//     list.appendChild(li);
//   });
// }

// // 📌 MARK DONE
// async function markDone(id) {
//   const token = localStorage.getItem("token");

//   await fetch(`${API}/api/tasks/update-status`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token
//     },
//     body: JSON.stringify({
//       taskId: id,
//       status: "completed"
//     })
//   });

//   loadTasks();
// }

// // 📌 DELETE TASK
// async function deleteTask(id) {
//   const token = localStorage.getItem("token");

//   await fetch(`${API}/api/tasks/delete/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: "Bearer " + token
//     }
//   });

//   loadTasks();
// }

// // 🔥 AUTO LOAD
// if (window.location.pathname.includes("dashboard")) {
//   loadProjects();
//   loadTasks();
//   loadUsers();
//   loadUsersForMember();
//   loadProjectDropdown();

//   const role = localStorage.getItem("role");

//   if (role !== "admin") {
//     document.querySelector(".create-task-card").style.display = "none";
//     document.querySelector(".create-project-card").style.display = "none";

//     document.querySelectorAll(".member-only").forEach(el => {
//       el.style.display = "none";
//     });
//   }
// }





const API = "http://localhost:5000";

// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
}
 // Signup
 async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Signup successful");

    // 🔥 FIX HERE
    window.location.href = "index.html";

  } else {
    alert(data.message || "Signup failed");
  }
}
// 📌 LOAD USERS (Assign)
async function loadUsers() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/auth/users`, {
    headers: { Authorization: "Bearer " + token }
  });

  const users = await res.json();

  const select = document.getElementById("assignUser");
  if (!select) return;

  select.innerHTML = "";

  users.forEach(u => {
    const option = document.createElement("option");
    option.value = u._id;
    option.text = `${u.name} (${u.role})`;
    select.appendChild(option);
  });
}

// 📌 LOAD USERS FOR MEMBER ADD
async function loadUsersForMember() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/auth/users`, {
    headers: { Authorization: "Bearer " + token }
  });

  const users = await res.json();

  const select = document.getElementById("memberSelect");
  if (!select) return;

  select.innerHTML = "";

  users.forEach(u => {
    const option = document.createElement("option");
    option.value = u._id;
    option.text = `${u.name} (${u.role})`;
    select.appendChild(option);
  });
}

// 📌 LOAD PROJECT DROPDOWN
async function loadProjectDropdown() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/projects`, {
    headers: { Authorization: "Bearer " + token }
  });

  const projects = await res.json();

  const select = document.getElementById("projectSelect");
  if (!select) return;

  select.innerHTML = "";

  projects.forEach(p => {
    const option = document.createElement("option");
    option.value = p._id;
    option.text = p.name;
    select.appendChild(option);
  });
}

// 📌 CREATE PROJECT
async function createProject() {
  const name = document.getElementById("projectName").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/api/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ name })
  });

  document.getElementById("projectName").value = "";
  loadProjects();
  loadProjectDropdown();
}

// 📌 LOAD PROJECTS
async function loadProjects() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/projects`, {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  const list = document.getElementById("projects");
  if (!list) return;

  list.innerHTML = "";

  data.forEach(p => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-row">
        <span>${p.name}</span>
      </div>
    `;

    list.appendChild(li);
  });
}

// 📌 ADD MEMBER
async function addMember() {
  const projectId = document.getElementById("projectSelect").value;
  const userId = document.getElementById("memberSelect").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/api/projects/add-member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ projectId, userId })
  });

  alert("Member added");
}

// 📌 CREATE TASK (with due date)
async function createTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDesc").value;
  const assignedTo = document.getElementById("assignUser").value;
  const projectId = document.getElementById("projectSelect").value;
  const dueDate = document.getElementById("dueDate").value;

  const token = localStorage.getItem("token");

  await fetch(`${API}/api/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      title,
      description,
      projectId,
      assignedTo,
      dueDate
    })
  });

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("dueDate").value = "";

  loadTasks();
}

// 📌 LOAD TASKS (with overdue + permissions)
async function loadTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/tasks`, {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  const list = document.getElementById("tasks");
  if (!list) return;

  list.innerHTML = "";

  const role = localStorage.getItem("role");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentUserId = payload.id;

  data.forEach(t => {
    const li = document.createElement("li");

    const isAdmin = role === "admin";
    const isOwner = t.assignedTo?._id === currentUserId;

    const isOverdue =
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "completed";

    li.innerHTML = `
      <div class="task-row">
        <span class="${t.status === "completed" ? "completed" : ""}">
          ${t.title} - ${t.status}
          <br>
          <small>Assigned: ${t.assignedTo?.name || "N/A"}</small>
          <br>
          <small>Due: ${t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "N/A"}</small>
          ${isOverdue ? "<br><span style='color:red'>⚠️ Overdue</span>" : ""}
        </span>

        <div class="btn-group">

          ${
            (isAdmin || isOwner) && t.status !== "completed"
              ? `<button onclick="markDone('${t._id}')">Done</button>`
              : ""
          }

          ${
            isAdmin
              ? `<button onclick="deleteTask('${t._id}')" class="delete-btn">Delete</button>`
              : ""
          }

        </div>
      </div>
    `;

    list.appendChild(li);
  });
}

// 📌 MARK DONE
async function markDone(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/api/tasks/update-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      taskId: id,
      status: "completed"
    })
  });

  loadTasks();
}

// 📌 DELETE TASK
async function deleteTask(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/api/tasks/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  loadTasks();
}

// 🔥 AUTO LOAD
if (window.location.pathname.includes("dashboard")) {
  loadProjects();
  loadTasks();
  loadUsers();
  loadUsersForMember();
  loadProjectDropdown();

  const role = localStorage.getItem("role");

  if (role !== "admin") {
    document.querySelector(".create-task-card").style.display = "none";
    document.querySelector(".create-project-card").style.display = "none";

    document.querySelectorAll(".member-only").forEach(el => {
      el.style.display = "none";
    });
  }
}