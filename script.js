let getTasks = JSON.parse(localStorage.getItem("alltasks")) || [];
const taskList = document.querySelector(".tasks-list");

taskList.addEventListener("click", (event) => {
  if (event.target.innerText === "Delete") {
    const spanTask = event.target.parentElement.querySelector("span");
    let getTask3 = JSON.parse(localStorage.getItem("alltasks"));
    for (let t in getTask3) {
      if (getTask3[t].content == spanTask.innerText) {
        getTask3.splice(t, 1);
        break;
      }
    }
    localStorage.setItem("alltasks", JSON.stringify(getTask3));
    event.target.parentElement.remove();
  }
});

for (const taskss of getTasks) {
  const newDiv = document.createElement("div");
  const newSpan = document.createElement("span");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  delBtn.classList.add("del-btn");
  newDiv.appendChild(newSpan);
  newDiv.appendChild(editBtn);
  newDiv.appendChild(delBtn);
  editBtn.innerText = "Edit";
  delBtn.innerText = "Delete";
  newSpan.innerText = taskss.content;
  newDiv.classList.add("task");
  taskList.appendChild(newDiv);
}

const taskbtn = document.querySelector(".add-task-btn");

taskbtn.addEventListener("click", () => {
  const taskContent = document.querySelector(".task-box");
  let savedTasks = JSON.parse(localStorage.getItem("alltasks")) || [];
  savedTasks.push({ id: savedTasks.length, content: taskContent.value });
  localStorage.setItem("alltasks", JSON.stringify(savedTasks));
  getTasks = JSON.parse(localStorage.getItem("alltasks"));
  taskList.innerHTML = "";
  for (const taskss of getTasks) {
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    delBtn.classList.add("del-btn");
    newDiv.appendChild(newSpan);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(delBtn);
    editBtn.innerText = "Edit";
    delBtn.innerText = "Delete";
    newSpan.innerText = taskss.content;
    newDiv.classList.add("task");
    taskList.appendChild(newDiv);
  }
});
