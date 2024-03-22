const createtaskmenu = document.querySelector(".createtask");
const edittaskmenu = document.querySelector(".edittask")
function createtaskopen() {
    createtaskmenu.style.display = 'block';
}

function createtaskclose() {
    createtaskmenu.style.display = 'none';
}
function edittaskopen(){
    edittaskmenu.style.display = 'block';
}
function edittaskclose(){
    edittaskmenu.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromPage();
});

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var tableRows = document.getElementById('taskTableBody').getElementsByTagName('tr');
    if (tableRows.length >= 4) {
        document.getElementById('taskLimitMessage').style.display = 'block';
        return;
    }

    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    addTaskToTable(description, date);

    // Limpa os campos do formulário
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';

    if (tableRows.length >= 5) {
        document.getElementById('createTaskButton').classList.add('disabled');
    }
});

function addTaskToTable(description, date) {
    var tableBody = document.getElementById('taskTableBody');
    var newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${description}</td>
        <td>${date}</td>
        <td><input type="checkbox" onclick="completeTask(this)"></td>
        <td><button onclick="edittaskopen()"><i class='fas fa-edit'></i></button></td>
    `;
}

function completeTask(checkbox) {
    var tableRow = checkbox.parentNode.parentNode;
    tableRow.remove();
    document.getElementById('createTaskButton').classList.remove('disabled');
    document.getElementById('taskLimitMessage').style.display = 'none';
}

function loadTasksFromPage() {
    // No localStorage needed for this implementation
}
