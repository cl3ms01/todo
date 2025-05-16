var form = document.getElementById('clement');
var taskList = document.getElementById('eloho');
var error = document.getElementById('errorMsg');

form.addEventListener('submit', addTodo);
taskList.addEventListener('click', removeTask);

function addTodo(e) {
    e.preventDefault();
    var newTask = document.getElementById('kester').value;
    if (newTask === "") {
        error.innerText = "Please add a task!";
        error.style.display = "block";
        setTimeout(function() {
            error.style.display = "none";
        }, 1000);
    }
    else {
    var li = document.createElement('li');
    li.className = 'taskItem';
    li.appendChild(document.createTextNode(newTask));
    taskList.appendChild(li);
    var btn = document.createElement('button');
    btn.className = 'delete';
    btn.appendChild(document.createTextNode('Remove Item'));
    li.appendChild(btn);
    taskList.appendChild(li);
    document.getElementById('kester').value = "";

     var items = taskList.querySelectorAll('li');
        items.forEach(function(item, index) {
            if ((index + 1) % 2 === 0) {
                item.style.backgroundColor = '#ccc'; // even
            } else {
                item.style.backgroundColor = '#f4f4f4'; // odd
            }
        });
    }
}

function removeTask(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            taskList.removeChild(li);
    var items = taskList.querySelectorAll('li');
        items.forEach(function(item, index) {
            if ((index + 1) % 2 === 0) {
                item.style.backgroundColor = '#ccc'; // even
            } else {
                item.style.backgroundColor = '#f4f4f4'; // odd
            }
        });
        }
    }
}