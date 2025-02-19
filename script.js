document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let editingTask = null;

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            if (editingTask !== null) {
                tasks[editingTask] = task;
                editingTask = null;
            } else {
                tasks.push(task);
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    }

    function editTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskInput.value = tasks[index];
        editingTask = index;
    }

    function deleteTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    // Expose editTask and deleteTask functions to the global scope
    window.editTask = editTask;
    window.deleteTask = deleteTask;

    // Initial render
    renderTasks();
});
