const createtaskmenu = document.querySelector(".createtask")

function createtaskopen(){
    createtaskmenu.style.display = 'block';
}

function createtaskclose(){
    createtaskmenu.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var tableBody = document.getElementById('taskTableBody');

    tasks.forEach(function (task) {
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''}></td>
        `;
    });
});

    // Load tasks from localStorage when the page loads
    document.addEventListener('DOMContentLoaded', function () {
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        var tableBody = document.getElementById('taskTableBody');

        tasks.forEach(function (task) {
            addTaskToTable(task);
        });
    });

    document.getElementById('taskForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        var description = document.getElementById('description').value;
        var date = document.getElementById('date').value;

        // Create a new task object
        var newTask = { description: description, date: date, completed: false };

        // Add the task to the table and save it
        addTaskToTable(newTask);
        saveTasksToLocalStorage();
    });

    function addTaskToTable(task) {
        var tableBody = document.getElementById('taskTableBody');
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''} onclick="completeTask(this, ${tableBody.rows.length - 1})"></td>
        `;
    }

    function completeTask(checkbox, rowIndex) {
        var tableRow = checkbox.parentNode.parentNode;

        // Add fade out animation to the row
        tableRow.classList.add('fadeOut');

        // Remove the task from localStorage after the animation finishes
        setTimeout(function () {
            tableRow.remove();
            saveTasksToLocalStorage();
        }, 500);
    }

    function saveTasksToLocalStorage() {
        var tasks = [];
        var tableBody = document.getElementById('taskTableBody');

        for (var i = 0; i < tableBody.rows.length; i++) {
            var row = tableBody.rows[i];
            tasks.push({
                description: row.cells[0].textContent,
                date: row.cells[1].textContent,
                completed: row.cells[2].querySelector('input[type="checkbox"]').checked
            });
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
