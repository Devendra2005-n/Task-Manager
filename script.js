// script.js
$(document).ready(function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        $('#taskList').empty();
        tasks.forEach((task, index) => {
            $('#taskList').append(`
                <li class="list-group-item">
                    <span class="task-text">${task}</span>
                    <div class="task-actions">
                        <button class="btn btn-sm btn-info edit" data-index="${index}">Edit</button>
                        <button class="btn btn-sm btn-danger delete" data-index="${index}">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    $('#taskForm').on('submit', function (e) {
        e.preventDefault();
        const task = $('#taskInput').val().trim();
        if (task) {
            tasks.push(task);
            saveTasks();
            renderTasks();
            $('#taskInput').val('');
        }
    });

    $('#taskList').on('click', '.delete', function () {
        const index = $(this).data('index');
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $('#taskList').on('click', '.edit', function () {
        const index = $(this).data('index');
        const listItem = $(this).closest('li');
        const currentText = tasks[index];

        listItem.addClass('edit-mode');
        listItem.html(`
            <input type="text" class="form-control edit-input" value="${currentText}" />
            <div class="task-actions">
                <button class="btn btn-sm btn-success save-edit">Save</button>
                <button class="btn btn-sm btn-secondary cancel-edit">Cancel</button>
            </div>
        `);

        listItem.find('.save-edit').on('click', function () {
            const updatedText = listItem.find('.edit-input').val().trim();
            if (updatedText) {
                tasks[index] = updatedText;
                saveTasks();
                renderTasks();
            }
        });

        listItem.find('.cancel-edit').on('click', function () {
            renderTasks();
        });
    });

    renderTasks();
});
