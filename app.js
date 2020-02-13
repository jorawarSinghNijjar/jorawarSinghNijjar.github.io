const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener("DOMContentLoaded",getTasks);
//Add task event
    form.addEventListener("submit",addTask);
    //Remove task event
    taskList.addEventListener("click",removeTask);
    //Clear Task event
    clearBtn.addEventListener("click",clearTasks);
    //Filter Task event
    filter.addEventListener("keyup",filterTasks);
}

//Get Tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.className = "collection-item";
    
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement("a");
    
        link.className = "delete-item secondary-content";
    
        link.innerHTML ='<i class="fa fa-remove"></i>';
    
        li.appendChild(link);
    
        taskList.appendChild(li);
    
    });
}

function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task");
    }

    const li = document.createElement("li");
    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML ='<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    //Store tasks in local storage

    storeTasks(taskInput.value);

    taskInput.value = "";

    console.log(li);
    e.preventDefault();
}
//Store Tasks
function storeTasks(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks",JSON.stringify(tasks));

}




//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
    e.target.parentElement.parentElement.remove();
    removeTaskLS(e.target.parentElement.parentElement);
        }
    }
}
//Remove from Local Storage
function removeTaskLS(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    }
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
//Clear tasks from LS
    clearTasksLS();
}

//Clear local storage
function clearTasksLS(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                 task.style.display ="block";

            }
            else{
                task.style.display = "none";
            }
        });

    console.log(text);
}
