let getTasks = JSON.parse(localStorage.getItem("alltasks")) || [];
const taskList = document.querySelector(".tasks-list");

taskList.addEventListener("click", (event) => {
  if (event.target.innerText === "Delete") {
    let getId = event.target.parentElement.getAttribute("data-id");
    let getTask3 = JSON.parse(localStorage.getItem("alltasks"));
    for (let t in getTask3) {
      if (getTask3[t].id === getId) {
        getTask3.splice(t, 1);
        break;
      }
    }
    localStorage.setItem("alltasks", JSON.stringify(getTask3));
    event.target.parentElement.remove();
  }

  if (event.target.innerText === "Edit") {
    const taskinput = event.target.parentElement.querySelector("input");
    let getId = event.target.parentElement.getAttribute("data-id");
    taskinput.disabled = false;
    taskinput.removeEventListener("keydown", handleEnterPress);

    function handleEnterPress(event) {
      if (event.key === "Enter") {
        console.log("enter pressed");
        let getTask3 = JSON.parse(localStorage.getItem("alltasks"));
        for (let t in getTask3) {
          if (getTask3[t].id == getId) {
            getTask3[t].content = taskinput.value;
            break;
          }
        }
        localStorage.setItem("alltasks", JSON.stringify(getTask3));

        taskinput.value = taskinput.value;
        taskinput.disabled = true;

        taskinput.removeEventListener("keydown", handleEnterPress);
      }
    }
    taskinput.addEventListener("keydown", handleEnterPress);
  }
});

displaytasks();

document.querySelector("#task-box").addEventListener("keydown", (event) => {
  if (event.key == "Enter") addTask();
});

document.querySelector(".add-task-btn").addEventListener("click", () => {
  addTask();
});

function displaytasks() {
  for (const taskss of getTasks) {
    const newDiv = document.createElement("div");
    const newinput = document.createElement("input");
    newinput.classList.add("finaltask");
    newinput.disabled = true;
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    editBtn.classList.add("ml-1");
    delBtn.classList.add("ml-1");
    newDiv.appendChild(newinput);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(delBtn);
    editBtn.innerText = "Edit";
    delBtn.innerText = "Delete";
    newinput.value = taskss.content;
    newDiv.setAttribute("data-id", taskss.id);
    newDiv.classList.add("task");
    taskList.appendChild(newDiv);
  }
}

function addTask() {
  const taskContent = document.querySelector("#task-box");
  let savedTasks = JSON.parse(localStorage.getItem("alltasks")) || [];
  savedTasks.push({ id: crypto.randomUUID(), content: taskContent.value });
  localStorage.setItem("alltasks", JSON.stringify(savedTasks));
  getTasks = JSON.parse(localStorage.getItem("alltasks"));
  taskList.innerHTML = "";
  displaytasks();
}
