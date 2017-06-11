/*jslint node: true */
/*jslint plusplus: true */
/*jslint browser: true*/
/*global $, jQuery, alert*/
"use strict";

var todoForm = document.getElementById("todo-form");
var addInput = document.getElementById("add-input");
var todoList = document.getElementById("todo-list");
var todoItems = document.querySelectorAll(".todo-item");

function createTodoItem(title) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  
  var label = document.createElement("label");
  label.innerText = title;
  label.className = "title";
  
  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "textfield";
  
  var editButton = document.createElement("button");
  editButton.innerText = "Изменить";
  editButton.className = "edit";
  
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Удалить";
  deleteButton.className = "delete";
  
  var listItem = document.createElement("li");
  listItem.className = "todo-item";
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  bindEvents(listItem);
  
//  console.log(listItem);
  
  return listItem;
}

function bindEvents(todoItem) {
  var checkbox = todoItem.querySelector(".checkbox");
  var editButton = todoItem.querySelector(".edit");
  var deleteButton = todoItem.querySelector(".delete");
  
  checkbox.addEventListener("change", toggleTodoItem);
  editButton.addEventListener("click", editTodoItem);
  deleteButton.addEventListener("click", deleteTodoItem);
}

function addTodoItem(event) {
  event.preventDefault();
  
  if (addInput.value === "") {
    return alert("Необходимо ввести название задачи.");
  }
  
  var todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);
  addInput.value = "";
}

function toggleTodoItem(event) {
  var listItem = this.parentNode;
  listItem.classList.toggle("completed");
}

function editTodoItem() {
  var listItem = this.parentNode;
  var title = listItem.querySelector(".title");
  var editInput = listItem.querySelector(".textfield");
  var isEditing = listItem.classList.contains("editing");
  
  if (isEditing) {
    title.innerText = editInput.value;
    this.innerText = "Изменить";
  } else {
    editInput.value = title.innerText;
    this.innerText = "Сохранить";
  }
  
  listItem.classList.toggle("editing");
}
function deleteTodoItem() {
  var listItem = this.parentNode;
  todoList.removeChild(listItem);
}

function load() {
  var data = JSON.parse(localStorage.getItem("todos"));
  return data;
}

function save(data) {
  var string = JSON.stringify(data);
  localStorage.setItem("todos", string);
}

todoForm.addEventListener("submit", addTodoItem);