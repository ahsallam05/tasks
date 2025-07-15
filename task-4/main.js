let tasks = [];

let taskName = document.getElementById("taskName");
let taskType = document.getElementById("taskType");
let btn = document.querySelector("button");
let taskList = document.querySelector("ul");
let currentDate = new Date().toDateString();

btn.addEventListener("click", addTask);

function addTask() {
  if (taskName.value === "") return;
  let newTask = {
    name: taskName.value,
    type: taskType.value,
    dateAdded: currentDate,
  };

  tasks.push(newTask);

  newTask = tasks[tasks.length - 1];
  listItem = document.createElement("li");
  listItem.innerHTML = `
  <strong>${newTask.name}</strong>
  <br>
  Type: ${newTask.type}
  <br>
  Added: ${newTask.dateAdded}
  <button class="edit-btn" onclick="editTask()">edit</button>
  <button class="delete-btn" onclick="deleteTask()">delete</button>
  `;
  taskList.appendChild(listItem);

  if (taskType.value === "Task") {
    listItem.style.backgroundColor = "#f85353";
  } else if (taskType.value === "In Progress") {
    listItem.style.backgroundColor = "orange"
  } else {
    listItem.style.backgroundColor = "#4CAF50";
  }
}