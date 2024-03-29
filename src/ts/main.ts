const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('input') as HTMLInputElement;
const todosUl = document.getElementById('todos') as HTMLUListElement;

const todos = JSON.parse(localStorage.getItem('todos') as string);

type Todo = { text: string; completed: boolean };

function updateLS() {
  const todosEl = document.querySelectorAll('li');

  const todosArray: Todo[] = [];

  todosEl.forEach((todoEl) => {
    todosArray.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todosArray));
}

function addTodo(todo?: Todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosUl.appendChild(todoEl);

    input.value = '';

    updateLS();
  }
}

if (todos) {
  todos.forEach((todo: Todo) => {
    addTodo(todo);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
});
