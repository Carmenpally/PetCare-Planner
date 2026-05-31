document.addEventListener('DOMContentLoaded', () => {
    const formMascota = document.getElementById('form-registro-mascota');
    const inputImagen = document.getElementById('pet-imagen');
    const listaMascotasContainer = document.getElementById('lista-mascotas-container');
    const botonGuardarMascota = formMascota.querySelector('.btn-submit-registro');

    let fotoMascotaBase64 = "";
    let idMascotaEditando = null;
    let listaMascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return "Edad no disponible";

        const hoy = new Date();
        const cumpleanos = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const mes = hoy.getMonth() - cumpleanos.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        if (edad < 1) {
            return "Cachorro";
        }

        return edad === 1 ? "1 a\u00f1o" : `${edad} a\u00f1os`;
    };

    const guardarMascotas = () => {
        localStorage.setItem('mascotas', JSON.stringify(listaMascotas));
    };

    const limpiarFormulario = () => {
        formMascota.reset();
        fotoMascotaBase64 = "";
        idMascotaEditando = null;
        botonGuardarMascota.textContent = "Agregar Mascota";
    };

    const renderMascotas = () => {
        listaMascotasContainer.innerHTML = "";

        if (listaMascotas.length === 0) {
            listaMascotasContainer.innerHTML = `
                <li class="no-mascotas-msg" style="text-align: center; color: var(--texto-suave); padding: 20px;">
                    <p>Aun no tienes compañeros registrados. Agrega el primero!</p>
                </li>
            `;
            return;
        }

        listaMascotas.forEach((mascota) => {
            const li = document.createElement('li');
            const avatarContenido = mascota.foto
                ? `<img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">`
                : `<span aria-hidden="true">&#128062;</span>`;

            li.innerHTML = `
                <article class="mascota-card">
                    <figure class="mascota-avatar">
                        ${avatarContenido}
                    </figure>
                    <section class="mascota-info">
                        <h3>${mascota.nombre}</h3>
                        <p>Especie: ${mascota.especie.charAt(0).toUpperCase() + mascota.especie.slice(1)}</p>
                        <p>Edad: ${calcularEdad(mascota.nacimiento)}</p>
                        <p>Peso: ${mascota.peso} kg</p>
                    </section>
                    <div class="mascota-acciones">
                        <button type="button" class="btn-editar-mascota" data-id="${mascota.id}">
                            Editar
                        </button>
                        <button type="button" class="btn-eliminar-mascota" data-id="${mascota.id}">
                            Eliminar
                        </button>
                    </div>
                </article>
            `;

            listaMascotasContainer.appendChild(li);
        });
    };

    listaMascotasContainer.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-eliminar-mascota')) {
            const idMascota = Number(evento.target.dataset.id);
            const confirmar = confirm("¿Estás seguro de que quieres eliminar a este compañero?");
            
            if (confirmar) {
                listaMascotas = listaMascotas.filter((mascota) => mascota.id !== idMascota);
                
                guardarMascotas();
                renderMascotas();
                
                if (idMascotaEditando === idMascota) {
                    limpiarFormulario();
                }
            }
            return; 
        }

        const botonEditar = evento.target.closest('.btn-editar-mascota');
        if (botonEditar) {
            const idMascota = Number(botonEditar.dataset.id);
            const mascota = listaMascotas.find((item) => item.id === idMascota);
            if (!mascota) return;

            document.getElementById('pet-nombre').value = mascota.nombre;
            document.getElementById('pet-especie').value = mascota.especie;
            document.getElementById('pet-notas').value = mascota.notas;
            document.getElementById('pet-nacimiento').value = mascota.nacimiento;
            document.getElementById('pet-peso').value = mascota.peso;

            fotoMascotaBase64 = mascota.foto || "";
            idMascotaEditando = idMascota;
            botonGuardarMascota.textContent = "Guardar cambios";
            formMascota.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    inputImagen.addEventListener('change', (evento) => {
        const archivo = evento.target.files[0];

        if (archivo) {
            const lector = new FileReader();

            lector.onload = (e) => {
                fotoMascotaBase64 = e.target.result;
            };

            lector.readAsDataURL(archivo);
        }
    });

    formMascota.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // --- INICIO DEL CAMBIO ---
        // 1. Obtenemos el texto sin espacios a los lados
        const nombreBruto = document.getElementById('pet-nombre').value.trim();
        
        // 2. Transformamos: Primera letra mayúscula + el resto en minúscula
        const nombre = nombreBruto ? nombreBruto.charAt(0).toUpperCase() + nombreBruto.slice(1).toLowerCase() : "";
        // --- FIN DEL CAMBIO ---

        const especie = document.getElementById('pet-especie').value;
        const notas = document.getElementById('pet-notas').value.trim();
        const nacimiento = document.getElementById('pet-nacimiento').value;
        const peso = document.getElementById('pet-peso').value;

        const mascotaActualizada = {
            id: idMascotaEditando || Date.now(),
            nombre, // Aquí ya se guarda con el formato correcto
            especie,
            notas,
            nacimiento,
            peso,
            foto: fotoMascotaBase64
        };

        if (idMascotaEditando) {
            listaMascotas = listaMascotas.map((mascota) => {
                return mascota.id === idMascotaEditando ? mascotaActualizada : mascota;
            });
        } else {
            listaMascotas.push(mascotaActualizada);
        }

        guardarMascotas();
        renderMascotas();
        limpiarFormulario();
    });

    renderMascotas();
});
