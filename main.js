const form = document.getElementById('todoForm');
const taskList = document.getElementById('todoTask');
const error = document.getElementById('errorMsg');
const input = document.getElementById('formInput')
const hide = document.querySelector('.addedTask')
const deleteAll = document.getElementById('deleteBtn')

form.addEventListener('submit', addTodo);
taskList.addEventListener('click', removeTask);
deleteAll.addEventListener('click', removeAll)

function addTodo(e) {
    e.preventDefault();
    const newTask = document.getElementById('formInput').value
    if (newTask === "") {
        error.classList.replace('hidden', 'error');
        setTimeout(function() {
            error.classList.replace('error', 'hidden');
        }, 2000);
        return;
    } else {
    const todoTask = capitalizeFirstLetter(newTask)
    const li = document.createElement('li');
    li.className = 'taskItem';
    li.innerHTML = `<span>${todoTask}</span><i class="fa-sharp fa-solid fa-xmark delete"></i>`;
    taskList.appendChild(li);
    input.value = ''
    saveTasks(todoTask)
    }
    clearUI()
    return
}

function removeTask(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            const li = e.target.parentElement
            const text = li.firstElementChild.textContent
            taskList.removeChild(li)
            removeTaskFromStorage(text)
        }
    }
    clearUI()
    return
}

function removeAll(e) {
    if (e.target.classList.contains('deleteAll')) {
        if(confirm('Delete all tasks')){
            const li = e.target.parentElement
            document.querySelector('.container').removeChild(li)
            localStorage.removeItem('tasks')
        }
    }
    clearUI()
    return
}

function clearUI() {
    if (taskList.children.length === 0) {
        hide.style.display = 'none'
    } else {
        hide.style.display = 'flex'
    }
    return
}

function capitalizeFirstLetter(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1))
}

function getTasks () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        const li = document.createElement('li')
        li.className = 'taskItem'
        li.innerHTML = `<span>${task}</span><i class="fa-sharp fa-solid fa-xmark delete"></i>`
        taskList.appendChild(li)
    });
}

function saveTasks (task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTaskFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.filter(task => task !== taskToRemove)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

clearUI()
document.addEventListener('DOMContentLoaded', getTasks)