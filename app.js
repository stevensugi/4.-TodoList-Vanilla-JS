//Selector 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();

    // Todo DIV
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDIV.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Check mark buttom
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDIV.appendChild(completedButton);

    //Check trash buttom
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDIV);

    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
          todo.remove();
        });
      }

    //Check Todo
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }   
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
            break;
        }
    });
}

function saveLocalTodos(todo){
    //Check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo DIV
        const todoDIV = document.createElement('div');
        todoDIV.classList.add('todo');
        
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDIV.appendChild(newTodo);
        
        //Check mark buttom
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDIV.appendChild(completedButton);
        
        //Check trash buttom
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDIV.appendChild(trashButton);
        
        //Append to list
        todoList.appendChild(todoDIV);
    });
}

function removeLocalTodos(todo){
    //Check do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);   
    localStorage.setItem('todos', JSON.stringify(todos));
}