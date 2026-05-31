const taskForm = document.querySelector("#task-form");
const taskName = document.querySelector("#task-name");
const taskDate = document.querySelector("#task-date");
const taskPriority = document.querySelector("#task-priority");
const taskPet = document.querySelector("#task-pet");
const formMessage = document.querySelector("#form-message");
const newTaskButton = document.querySelector("#btn-nueva-tarea");
const liveStatus = document.querySelector("#live-status");

const storageKeys = {
    tasks: "petcareTasks",
    theme: "petcareTheme"
};

const defaultTasks = [
    {
        id: 1,
        name: "Cambiar agua y revisar comida",
        date: getDateWithOffset(0),
        priority: "normal",
        mascota: "General"
    },
    {
        id: 2,
        name: "Comprar antipulgas",
        date: getDateWithOffset(1),
        priority: "alta",
        mascota: "General"
    },
    {
        id: 3,
        name: "Limpiar cuchita",
        date: getDateWithOffset(-1),
        priority: "normal",
        mascota: "General"
    }
];

let tasks = loadTasks();

function cargarMascotasParaTareas() {
    if (!taskPet) return; 
    
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
    
    if (mascotasGuardadas.length === 0) {
        taskPet.innerHTML = '<option value="" disabled selected>⚠️ Registra una mascota en Perfil</option>';
        return;
    }

    taskPet.innerHTML = '<option value="" disabled selected>Elige para quién es...</option>';
    mascotasGuardadas.forEach(mascota => {
        const option = document.createElement("option");
        option.value = mascota.nombre;
        option.textContent = mascota.nombre;
        taskPet.appendChild(option);
    });
}

newTaskButton.addEventListener("click", () => {
    taskForm.classList.toggle("visible");

    if (taskForm.classList.contains("visible")) {
        taskName.focus();
    }
});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = taskName.value.trim();
    const date = taskDate.value;
    const mascotaAsignada = taskPet ? taskPet.value : "General"; 

    if (!name || !date || !mascotaAsignada) {
        showMessage("Completá el cuidado, la fecha y la mascota.");
        return;
    }

    tasks.push({
        id: Date.now(),
        name,
        date,
        mascota: mascotaAsignada 
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
    showMessage("Tarea guardada correctamente.");
});

document.addEventListener("click", (event) => {
    const doneButton = event.target.closest(".done-task");

    if (!doneButton) {
        return;
    }

    const taskId = Number(doneButton.dataset.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
});

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem(storageKeys.tasks));
    return Array.isArray(savedTasks) ? savedTasks : defaultTasks;
}

function saveTasks() {
    localStorage.setItem(storageKeys.tasks, JSON.stringify(tasks));
}

function renderTasks() {
    const groups = {
        vencidas: [],
        hoy: [],
        futuras: []
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach((task) => {
        const taskDay = new Date(`${task.date}T00:00:00`);

        if (taskDay < today) {
            groups.vencidas.push(task);
        } else if (taskDay.getTime() === today.getTime()) {
            groups.hoy.push(task);
        } else {
            groups.futuras.push(task);
        }
    });

    Object.entries(groups).forEach(([groupName, groupTasks]) => {
        const list = document.querySelector(`[data-task-group="${groupName}"]`);

        if (groupTasks.length === 0) {
            list.innerHTML = '<li class="empty-list">No hay tareas en esta categoría.</li>';
            return;
        }

        list.innerHTML = groupTasks.map(createTaskItem).join("");
    });

    updateLiveStatus(groups.hoy.length);
}

function createTaskItem(task) {
    const formattedDate = new Date(`${task.date}T00:00:00`).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short"
    });

    const mascotaMostrada = task.mascota ? task.mascota : "General";

    return `
        <li style="display: flex; justify-content: space-between; align-items: center; background: var(--panel-suave); padding: 12px 16px; border-radius: 10px; margin-bottom: 10px;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <strong style="font-size: 1.1rem; margin: 0; display: block; color: var(--texto-principal);">${task.name}</strong>
                
                <div style="display: flex; flex-direction: column; font-size: 0.85rem; color: var(--texto-suave);">
                    <span style="margin-bottom: 2px;">Para: <span style="font-weight: bold;">${mascotaMostrada}</span></span>
                    
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span>${formattedDate}</span>
                    </div>
                </div>
            </div>
            <button class="done-task" type="button" data-id="${task.id}" aria-label="Marcar ${task.name} como terminada" style="background: #68d391; color: white; border-radius: 50%; width: 32px; height: 32px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 10px;">✓</button>
        </li>
    `;
}

function updateLiveStatus(todayTasks) {
    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
    let nombreMascota = "Tu mascota"; 

    if (mascotasGuardadas.length > 0) {
        const mascotaMayor = mascotasGuardadas.reduce((mayor, actual) => {
            const fechaMayor = new Date(mayor.nacimiento);
            const fechaActual = new Date(actual.nacimiento);
            return fechaActual < fechaMayor ? actual : mayor;
        });
        nombreMascota = mascotaMayor.nombre; 
    }

    const text = todayTasks === 0
        ? `${nombreMascota} - Todo al día hoy`
        : `${nombreMascota} - ${todayTasks} cuidado${todayTasks === 1 ? "" : "s"} pendiente${todayTasks === 1 ? "" : "s"} hoy`;

    liveStatus.textContent = text;
}

function showMessage(message) {
    formMessage.textContent = message;

    window.setTimeout(() => {
        formMessage.textContent = "";
    }, 2500);
}

function getDateWithOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

function init() {
    cargarMascotasParaTareas();
    renderTasks();
    saveTasks();
    
}

init();