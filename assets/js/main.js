const taskForm = document.querySelector("#task-form");
const taskName = document.querySelector("#task-name");
const taskDate = document.querySelector("#task-date");
const taskPriority = document.querySelector("#task-priority");
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
        priority: "normal"
    },
    {
        id: 2,
        name: "Comprar antipulgas",
        date: getDateWithOffset(1),
        priority: "alta"
    },
    {
        id: 3,
        name: "Limpiar cuchita",
        date: getDateWithOffset(-1),
        priority: "normal"
    }
];

let tasks = loadTasks();

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
    const priority = taskPriority.value;

    if (!name || !date) {
        showMessage("Completá el cuidado y la fecha para guardar la tarea.");
        return;
    }

    tasks.push({
        id: Date.now(),
        name,
        date,
        priority
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

    return `
        <li>
            <span>
                <strong>${task.name}</strong>
                <small>${formattedDate} · prioridad ${task.priority}</small>
            </span>
            <button class="done-task" type="button" data-id="${task.id}" aria-label="Marcar ${task.name} como terminada">✓</button>
        </li>
    `;
}

function updateLiveStatus(todayTasks) {
    const text = todayTasks === 0
        ? "Luna - Todo al día hoy"
        : `Luna - ${todayTasks} cuidado${todayTasks === 1 ? "" : "s"} pendiente${todayTasks === 1 ? "" : "s"} hoy`;

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

    renderTasks();
    saveTasks();
}

init();
