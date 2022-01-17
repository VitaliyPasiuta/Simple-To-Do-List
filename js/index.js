const toDoList = document.getElementById("to-do_list");
const toDoListItem = document.querySelectorAll("#to-do_list li");
let toDoListDeleteItem = document.querySelectorAll("#to-do_list li input");
const addButton = document.querySelector(
  '#to-do_input_block input[type="button"]'
);
let mainInput = document.getElementById("input");

loadLoaclStorage();
updateEvnLisener();


function deleteLisener(event) {
  event.target.parentElement.remove();
  event.stopPropagation();
  updateLocalStorage();
}

function updateEvnLisener() {
  toDoListDeleteItem = document.querySelectorAll("#to-do_list li input");
  Array.from(toDoListDeleteItem).forEach((el) =>
    el.addEventListener("click", deleteLisener)
  );
}

function updateLocalStorage(){
  localStorage.setItem('to-do_list', toDoList.innerHTML)
}

function loadLoaclStorage(){
  const localStorageData = localStorage.getItem('to-do_list');
  toDoList.innerHTML = localStorageData;
}

function addTodo() {
  mainInput = document.getElementById("input");
  if (!/[\w]/.test(mainInput.value)) return;

  const createdLi = document.createElement("li");
  const createrDeleteLi = document.createElement("input");

  createrDeleteLi.type = "button";
  createrDeleteLi.value = "X";

  createdLi.innerHTML = mainInput.value;
  mainInput.value = "";

  createdLi.append(createrDeleteLi);
  toDoList.append(createdLi);

  updateEvnLisener();
  updateLocalStorage()
}

function onClickToDo(event) {
  if (event.target.tagName === "LI") {
    console.log(event.target.tagName);
    event.target.classList.toggle("checked");
    updateLocalStorage();
  }
}


addButton.addEventListener("click", addTodo);

mainInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

toDoList.addEventListener("click", onClickToDo);

