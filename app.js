// define variable
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// const addTask = document.querySelector('.btn')

// load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add event task
    form.addEventListener('submit', addTask)

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create an element li when a task is submitted
        const li = document.createElement('li');
        const a = document.createElement('a');

        // add a class to the li
        li.className = 'collection-item';

        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create a link element
        const link = document.createElement('a');

        // add a class
        link.className = 'delete-item secondary-content';

        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        // append link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }

    // create an element li when a task is submitted
    const li = document.createElement('li');
    const a = document.createElement('a');

    // add a class to the li
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create a link element
    const link = document.createElement('a');

    // add a class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    // clear the input
    taskInput.value = '';
    e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from local storage function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// clear tasks
function clearTasks () {
    if(confirm('Are you sure you want to delete all the tasks?')) {
        // taskList.innerHTML = '';
        // faster way to do it
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // clear from local storage
    clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}