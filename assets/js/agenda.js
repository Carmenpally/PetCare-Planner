document.addEventListener("DOMContentLoaded", () => {
    const formActividad = document.querySelector("#form-actividad");
    const inputDescripcion = document.querySelector("#descripcion");
    const inputFecha = document.querySelector("#fecha");
    const selectMascota = document.querySelector("#mascota-select"); 

    const storageKey = "petcareTasks";
    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

    function cargarMascotas() {
        const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
        
        if (mascotasGuardadas.length === 0) {
            selectMascota.innerHTML = '<option value="" disabled selected>⚠️ Registra una mascota primero</option>';
            return;
        }

        selectMascota.innerHTML = '<option value="" disabled selected>Elige a tu compañero...</option>';
        
        mascotasGuardadas.forEach(mascota => {
            const option = document.createElement("option");
            option.value = mascota.nombre;
            option.textContent = mascota.nombre;
            selectMascota.appendChild(option);
        });
    }
    cargarMascotas();

    function saveTasks() {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }

    if (formActividad) {
        formActividad.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const nombreBruto = inputDescripcion.value.trim();

            const nombre = nombreBruto ? nombreBruto.charAt(0).toUpperCase() + nombreBruto.slice(1).toLowerCase() : "";

            const fecha = inputFecha.value;
            const mascotaAsignada = selectMascota.value; 
            
            const categoriaInput = document.querySelector('input[name="categoria"]:checked');
            const categoria = categoriaInput ? categoriaInput.value : "general";

            if (!nombre || !fecha || !mascotaAsignada) {
                alert("Por favor completa todos los campos, incluyendo la mascota.");
                return;
            }

            tasks.push({
                id: Date.now(),
                name: nombre,
                date: fecha,
                categoria: categoria,
                mascota: mascotaAsignada 
            });

            saveTasks();
            formActividad.reset();
            renderAgendaTasks();

            
            const formMessage = document.querySelector("#form-message");
            if (formMessage) {
                formMessage.textContent = "¡Cuidado agendado correctamente!";
                formMessage.style.color = "var(--verde)";
                setTimeout(() => formMessage.textContent = "", 2500);
            }
        });
    }

    function renderAgendaTasks() {
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
            if (!list) return;

            if (groupTasks.length === 0) {
                list.innerHTML = '<li class="empty-list" style="color: var(--texto-suave);">No hay tareas en esta categoría.</li>';
                return;
            }

            list.innerHTML = groupTasks.map(task => {
                const formattedDate = new Date(`${task.date}T00:00:00`).toLocaleDateString("es-AR", {
                    day: "2-digit", month: "short"
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
                        <button class="done-task" type="button" data-id="${task.id}" style="background: #68d391; color: white; border-radius: 50%; width: 32px; height: 32px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 10px;">✓</button>
                    </li>
                `;
            }).join("");
        });
    }

    document.addEventListener("click", (event) => {
        const doneButton = event.target.closest(".done-task");
        if (!doneButton) return;

        const taskId = Number(doneButton.dataset.id);
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks();
        renderAgendaTasks(); 
    });

    renderAgendaTasks();
});