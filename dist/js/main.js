"use strict";
var form = document.getElementById('form');
var input = document.getElementById('input');
var todosUl = document.getElementById('todos');
var todos = JSON.parse(localStorage.getItem('todos'));
function updateLS() {
    var todosEl = document.querySelectorAll('li');
    var todosArray = [];
    todosEl.forEach(function (todoEl) {
        todosArray.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });
    localStorage.setItem('todos', JSON.stringify(todosArray));
}
function addTodo(todo) {
    var todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }
    if (todoText) {
        var todoEl_1 = document.createElement('li');
        if (todo && todo.completed) {
            todoEl_1.classList.add('completed');
        }
        todoEl_1.innerText = todoText;
        todoEl_1.addEventListener('click', function () {
            todoEl_1.classList.toggle('completed');
            updateLS();
        });
        todoEl_1.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            todoEl_1.remove();
            updateLS();
        });
        todosUl.appendChild(todoEl_1);
        input.value = '';
        updateLS();
    }
}
if (todos) {
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});
