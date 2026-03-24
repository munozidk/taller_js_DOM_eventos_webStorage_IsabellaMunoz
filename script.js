const tarea = document.getElementById("task-input");
const btAgregar = document.getElementById("add-task-btn");
const ulListaTareas = document.getElementById("task-list");

function createTaskElement (taskText) {
    //crea un elemento de la lista
    const elemento = document.createElement("li");
    elemento.textContent =  taskText;
    elemento.classList.add("task-item");

    //Insertar en el DOM
    ulListaTareas.appendChild (elemento);

    //Crear boton eliminar
    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.className = "delete-btn";

    //Agregar el boton al elemento de la lista
    elemento.appendChild(boton);

    boton.addEventListener("click", () => {elemento.remove();
        saveTasks();
    });
}

btAgregar.addEventListener("click", ()=> {
    if(tarea.value != ""){
       createTaskElement(tarea.value); 
       saveTasks();
       tarea.value = "";
    }
})

function saveTasks(){
    const tasks = [];
    const tasksItems = document.querySelectorAll(".task-item");
    tasksItems.forEach(item => {
        tasks.push(item.firstChild.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); //Stringify convierte el array a un string para almacenarlo en localStorage
    console.log("Tareas: ", tasks);
}

function LoadTasks(){
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []; //Parse convierte el string de vuelta a un array, si no hay tareas almacenadas devuelve un array vacío
    for (const task of storedTasks) {
        createTaskElement(task);
    }
}

LoadTasks();


