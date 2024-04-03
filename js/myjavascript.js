const createtaskmenu = document.querySelector(".createtask");
const edittaskmenu = document.querySelector(".edittask");
let editedRow = null;

function createtaskopen() {
    createtaskmenu.style.display = 'block';
}

function createtaskclose() {
    createtaskmenu.style.display = 'none';
}

function edittaskopen(button) {
    editedRow = button.parentNode.parentNode;
    const columns = editedRow.getElementsByTagName('td');
    const descriptionInput = document.getElementById('editDescription');
    const dateInput = document.getElementById('editDate');

    if (descriptionInput && dateInput) {
        descriptionInput.value = columns[0].innerText;
        dateInput.value = columns[1].innerText;
        edittaskmenu.style.display = 'block';
    }
}

function edittaskclose() {
    edittaskmenu.style.display = 'none';
}

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    var tableRows = document.getElementById('taskTableBody').getElementsByTagName('tr');
    if (tableRows.length >= 4) {
        document.getElementById('taskLimitMessage').style.display = 'block';
        return;
    }

    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;

    addTaskToTable(description, date);

    document.getElementById('description').value = '';
    document.getElementById('date').value = '';

    if (tableRows.length >= 5) {
        document.getElementById('createTaskButton').classList.add('disabled');
    }
});

document.getElementById('editTaskForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    var description = document.getElementById('editDescription').value;
    var date = document.getElementById('editDate').value;

    if (editedRow !== null) { 
        const columns = editedRow.getElementsByTagName('td');
        columns[0].innerText = description;
        columns[1].innerText = date;
        editedRow = null;
        edittaskmenu.style.display = 'none';
    }
});

function addTaskToTable(description, date) {
    var tableBody = document.getElementById('taskTableBody');
    var newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td data-label="Tarefa">${description}</td>
        <td data-label="Data">${date}</td>
        <td data-label="Estado"><input type="checkbox" onclick="completeTask(this)"></td>
        <td data-label="Editar"><button onclick="edittaskopen(this)"><i class='fas fa-edit'></i></button></td>
    `;
}

function completeTask(checkbox) {
    var tableRow = checkbox.parentNode.parentNode;
    tableRow.remove();
    document.getElementById('createTaskButton').classList.remove('disabled');
    document.getElementById('taskLimitMessage').style.display = 'none';
}