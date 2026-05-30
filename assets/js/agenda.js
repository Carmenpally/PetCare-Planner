document.addEventListener("DOMContentLoaded", () => {
    // 1. Capturamos los elementos de tu HTML
    const formActividad = document.querySelector("#form-actividad");
    const inputDescripcion = document.querySelector("#descripcion");
    const inputFecha = document.querySelector("#fecha");

    // ¡CLAVE! Usamos el mismo nombre que el archivo del inicio para compartir la memoria
    const storageKey = "petcareTasks";

    // Cargamos las tareas guardadas o creamos un array vacío
    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Función para guardar en localStorage
    function saveTasks() {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }

    // 2. Evento cuando presionas "Guardar Actividad"
    if (formActividad) {
        formActividad.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitamos que la página se recargue

            const nombre = inputDescripcion.value.trim();
            const fecha = inputFecha.value;
            
            // Capturamos qué categoría (radio button) elegiste
            const categoriaInput = document.querySelector('input[name="categoria"]:checked');
            const categoria = categoriaInput ? categoriaInput.value : "general";

            // Validamos que los datos existan
            if (!nombre || !fecha) return;

            // Agregamos la nueva tarea al array
            tasks.push({
                id: Date.now(),
                name: nombre,
                date: fecha,
                categoria: categoria
            });

            // Guardamos, limpiamos el formulario y actualizamos la pantalla
            saveTasks();
            formActividad.reset();
            renderAgendaTasks();
            
            // Mensaje de éxito opcional (si tienes un p#form-message en tu HTML)
            const formMessage = document.querySelector("#form-message");
            if (formMessage) {
                formMessage.textContent = "¡Cuidado agendado correctamente!";
                formMessage.style.color = "var(--verde)";
                setTimeout(() => formMessage.textContent = "", 2500);
            }
        });
    }

    // 3. Función para dibujar las tarjetas en el Cronograma General
    function renderAgendaTasks() {
        const groups = {
            vencidas: [],
            hoy: [],
            futuras: []
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Clasificamos cada tarea según su fecha
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

        // Inyectamos el HTML en los contenedores correspondientes
        Object.entries(groups).forEach(([groupName, groupTasks]) => {
            const list = document.querySelector(`[data-task-group="${groupName}"]`);
            if (!list) return;

            if (groupTasks.length === 0) {
                list.innerHTML = '<li class="empty-list" style="color: var(--texto-suave);">No hay tareas en esta categoría.</li>';
                return;
            }

            list.innerHTML = groupTasks.map(task => {
                const formattedDate = new Date(`${task.date}T00:00:00`).toLocaleDateString("es-AR", {
                    day: "2-digit", month: "short"
                });

                return `
                    <li style="display: flex; justify-content: space-between; background: var(--panel-suave); padding: 10px; border-radius: 10px; margin-bottom: 8px;">
                        <span>
                            <strong>${task.name}</strong><br>
                            <small style="color: var(--texto-suave);">${formattedDate} · Categoría: ${task.categoria}</small>
                        </span>
                        <button class="done-task" type="button" data-id="${task.id}" style="background: var(--verde); color: white; border-radius: 50%; width: 30px; height: 30px;">✓</button>
                    </li>
                `;
            }).join("");
        });
    }

    // 4. Funcionalidad para eliminar/marcar como completada una tarea
    document.addEventListener("click", (event) => {
        const doneButton = event.target.closest(".done-task");
        if (!doneButton) return;

        const taskId = Number(doneButton.dataset.id);
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks();
        renderAgendaTasks(); // Volvemos a dibujar las listas
    });

    // Ejecutamos el renderizado apenas carga la página
    renderAgendaTasks();
});