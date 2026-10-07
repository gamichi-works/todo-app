const savedTodos = localStorage.getItem("todos");
let todos = savedTodos ? JSON.parse(savedTodos) : [];
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function addTodo(todo, index) {
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const todoText = document.createElement("span");
    checkbox.checked = todo.completed;
    if (todo.completed) {
        todoText.classList.add("completed");
    }
    todoText.textContent = todo.text;
    const editButton = document.createElement("button");
    editButton.textContent = "編集";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    checkbox.addEventListener("change", function() {
        todo.completed = checkbox.checked;
        todoText.classList.toggle("completed", todo.completed);
        localStorage.setItem("todos", JSON.stringify(todos));
    });
    let isEditing = false;
    let editInput;
    editButton.addEventListener("click", function() {
        if (isEditing === false) {
            editInput = document.createElement("input");
            editInput.value = todoText.textContent;
            todoItem.replaceChild(editInput, todoText);
            editButton.textContent = "保存";
            isEditing = true;
        } else {
            todoText.textContent = editInput.value;
            todo.text = editInput.value;
            todoItem.replaceChild(todoText, editInput);
            editButton.textContent = "編集";
            isEditing = false;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })
    deleteButton.addEventListener("click", function() {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    });
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function(todo, index) {
        addTodo(todo, index);
    })
}

renderTodos();

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const todo = {
        text: input.value,
        completed: false
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    input.value = "";
});