document.addEventListener('DOMContentLoaded', function() {
    loadTodos();

    document.getElementById('todoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });

    document.getElementById('saveEditTodo').addEventListener('click', function() {
        saveTodoEdit();
    });
});

function loadTodos() {
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                todoList.appendChild(createTodoElement(todo));
            });
        })
        .catch(error => console.error('Error loading todos:', error));
}

function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item card mb-2 ${todo.completed ? 'completed' : ''}`;
    div.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id}, this.checked)">
                <label class="form-check-label todo-title">${todo.title}</label>
                <small class="text-muted d-block">${todo.description || ''}</small>
            </div>
            <div class="todo-actions">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editTodo(${todo.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

function addTodo() {
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('todoForm').reset();
        loadTodos();
    })
    .catch(error => console.error('Error adding todo:', error));
}

function toggleTodo(id, completed) {
    fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    })
    .then(() => loadTodos())
    .catch(error => console.error('Error updating todo:', error));
}

function editTodo(id) {
    fetch(`/todos/${id}`)
        .then(response => response.json())
        .then(todo => {
            document.getElementById('editTodoId').value = todo.id;
            document.getElementById('editTodoTitle').value = todo.title;
            document.getElementById('editTodoDescription').value = todo.description || '';
            document.getElementById('editTodoCompleted').checked = todo.completed;
            
            new bootstrap.Modal(document.getElementById('editTodoModal')).show();
        })
        .catch(error => console.error('Error loading todo:', error));
}

function saveTodoEdit() {
    const id = document.getElementById('editTodoId').value;
    const title = document.getElementById('editTodoTitle').value;
    const description = document.getElementById('editTodoDescription').value;
    const completed = document.getElementById('editTodoCompleted').checked;

    fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
    })
    .then(() => {
        bootstrap.Modal.getInstance(document.getElementById('editTodoModal')).hide();
        loadTodos();
    })
    .catch(error => console.error('Error updating todo:', error));
}

function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        fetch(`/todos/${id}`, {
            method: 'DELETE',
        })
        .then(() => loadTodos())
        .catch(error => console.error('Error deleting todo:', error));
    }
}