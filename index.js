function onPageLoaded() {
    const ul = document.querySelector('#todoList');
    const addTodoBtn = document.querySelector('#addTodoBtn');
    const todoInput = document.querySelector('#todoInput');
    const saveBtn = document.querySelector('.save-list');
    const clearBtn = document.querySelector('.clear-list');

    const createTodo = (text, id = 0) => {
        return `
        <li id="listItem-${id}" class="todo__list-item">
            <span>${text}</span>
            <span class="check">
                <button class="btn btn-sm btn-ready">Ok</button>
            </span>
            <span class="delete">
                <button class="btn btn-sm btn-delete">Х</button>
            </span>
        </li>
        `
    };

    function deleteTodoListener(el) {
        el.addEventListener('click', (event) => {
            event.parentElement.remove();
            event.stopPropagation();
        });
    }

    addTodoBtn.addEventListener('click', (event) => {
        if (todoInput.value !== '') {
            ul.insertAdjacentHTML('beforeend', createTodo(todoInput.value));
            todoInput.value = '';
            readyTodoItem();
            deleteTodoItem();
        }
    });

    todoInput.addEventListener('keydown', (event) => {
        if (todoInput.value !== '' && event.key === 'Enter') {
            ul.insertAdjacentHTML('beforeend', createTodo(todoInput.value));
            todoInput.value = '';
            readyTodoItem();
            deleteTodoItem();
        }
    });

    saveBtn.addEventListener('click', (event) => {
        localStorage.setItem('todoList', ul.innerHTML);
        readyTodoItem();
        deleteTodoItem();
    });

    clearBtn.addEventListener('click', () => {
        ul.innerHTML = '';
        localStorage.removeItem('todoList');
        deleteTodoListener(ul);
        readyTodoItem();
        deleteTodoItem();
    });

    function deleteTodoItem() {
        const deleteButtons = document.querySelectorAll("span.delete");
        for (const button of deleteButtons) {
            button.onclick = function() {
                button.parentElement.remove()
            }
        }
    }

    function readyTodoItem() {
        const readyButtons = document.querySelectorAll('span.check');
        for (const button of readyButtons) {
            button.onclick = function() {
                let prevEl = button.parentElement;
                if (!prevEl.className.includes('todo__list-item--checked')) {
                    prevEl.classList.add('todo__list-item--checked')
                } else if (prevEl.className.includes('todo__list-item--checked')) {
                    prevEl.classList.remove('todo__list-item--checked')
                }
            }
        }
    }

    function loadTodos() {
        const data = localStorage.getItem('todoList');
        if (data) {
            ul.innerHTML = data;
        }
        readyTodoItem();
        deleteTodoItem();
    }

    loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
