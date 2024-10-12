const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const aleart = document.getElementById('aleart');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (todoInput.value === '') {
        aleart.style.display = 'flex';
        return;
    } else {
        addlist(todoInput.value); // Pass the input value
        todoInput.value = '';
        savingDataToLocalStorage(); // Save to local storage
    }
});

function addlist(task) {
    const list = document.createElement('div'); // Use div for block layout
    list.style.display = 'flex';
    list.style.alignItems = 'center'; // Align items center

    const listItem = document.createElement("li");
    listItem.textContent = task; // Set list item text to the task

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const delete_button = document.createElement('button');
    delete_button.textContent = 'delete';
    delete_button.style.height = '20px';
    delete_button.style.marginLeft = '10px'; // Better margin for button

    const edit_button = document.createElement('button');
    edit_button.textContent = 'edit';
    edit_button.style.height = '20px';
    edit_button.style.marginLeft = '10px';

    // Append elements correctly
    list.appendChild(checkbox);
    list.appendChild(listItem);
    list.appendChild(edit_button);
    list.appendChild(delete_button);
    todoList.appendChild(list);

    // Checkbox change event listener
    checkbox.addEventListener('change', () => {
        listItem.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });

    // Delete button event listener
    delete_button.addEventListener('click', () => {
        todoList.removeChild(list); // Correct way to remove the list item
        savingDataToLocalStorage(); // Update local storage after deletion
    });

    // Edit button event listener
    edit_button.addEventListener('click', function() {
        const isEditing = listItem.classList.contains('editing');
        if (isEditing) {
            // Save the changes
            const input = list.querySelector('input[type="text"]'); // Find the input field
            listItem.textContent = input.value; // Update the list item with input value
            listItem.classList.remove('editing');
            edit_button.textContent = 'edit'; // Reset button text
            list.removeChild(input); // Remove input field
            savingDataToLocalStorage(); // Update local storage after editing
        } else {
            // Start editing
            const input = document.createElement('input');
            input.type = 'text';
            input.value = listItem.textContent; // Set input value to current list item text
            listItem.textContent = ''; // Clear list item text
            listItem.appendChild(input); // Add input to the list item
            listItem.classList.add('editing');
            edit_button.textContent = 'Save'; // Change button text to Save
        }
    });
}

function savingDataToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        const listText = li.textContent;
        tasks.push(listText);
    });
    localStorage.setItem('items', JSON.stringify(tasks)); // Save tasks to local storage
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('items')) || []; // Retrieve tasks from local storage
    savedTasks.forEach(task => {
        addlist(task); // Add each saved task to the list
    });
});
