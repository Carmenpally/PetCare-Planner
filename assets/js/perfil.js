document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar elementos del DOM
    const formMascota = document.getElementById('form-registro-mascota');
    const inputImagen = document.getElementById('pet-imagen');
    const listaMascotasContainer = document.getElementById('lista-mascotas-container');

    // Variable temporal para guardar la imagen en Base64
    let fotoMascotaBase64 = "";

    // 2. Inicializar el array de mascotas desde localStorage (o vacío si no hay nada)
    let listaMascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

    // 3. Función para calcular la edad a partir de la fecha de nacimiento
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
        return edad === 1 ? "1 año" : `${edad} años`;
    };

    // 4. Función para renderizar (dibujar) las mascotas en el panel lateral
    const renderMascotas = () => {
        // Limpiamos el contenedor para no duplicar los elementos
        listaMascotasContainer.innerHTML = "";

        if (listaMascotas.length === 0) {
            listaMascotasContainer.innerHTML = `
                <li class="no-mascotas-msg" style="text-align: center; color: var(--texto-suave); padding: 20px;">
                    <p>Aún no tienes compañeros registrados. ¡Agrega el primero!</p>
                </li>
            `;
            return;
        }

        // Recorremos el array y creamos el HTML semántico para cada mascota
        listaMascotas.forEach((mascota) => {
            const li = document.createElement('li');
            
            // Si el usuario subió foto, usamos la etiqueta img. Si no, dejamos el emoji por defecto.
            const avatarContenido = mascota.foto 
                ? `<img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">`
                : `<span aria-hidden="true">🐾</span>`;

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
                </article>
            `;
            
            listaMascotasContainer.appendChild(li);
        });
    };

    // 5. Escuchar el cambio en el input de archivo para convertir la imagen
    inputImagen.addEventListener('change', (evento) => {
        const archivo = evento.target.files[0];
        
        if (archivo) {
            const lector = new FileReader();
            
            lector.onload = (e) => {
                fotoMascotaBase64 = e.target.result; // Guardamos el texto de la imagen
            };
            
            lector.readAsDataURL(archivo);
        }
    });

    // 6. Escuchar el envío del formulario (Submit)
    formMascota.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita que la página se recargue

        // Capturar los valores actualizados de los inputs
        const nombre = document.getElementById('pet-nombre').value.trim();
        const especie = document.getElementById('pet-especie').value;
        const notas = document.getElementById('pet-notas').value.trim();
        const nacimiento = document.getElementById('pet-nacimiento').value;
        const peso = document.getElementById('pet-peso').value;

        // Crear el nuevo objeto mascota
        const nuevaMascota = {
            id: Date.now(), // ID único basado en el tiempo
            nombre,
            especie,
            notas,
            nacimiento,
            peso,
            foto: fotoMascotaBase64 // Si no seleccionó foto, irá vacío ""
        };

        // Agregar la nueva mascota al array de la aplicación
        listaMascotas.push(nuevaMascota);

        // Guardar el array actualizado en localStorage transformándolo a texto JSON
        localStorage.setItem('mascotas', JSON.stringify(listaMascotas));

        // Actualizar la interfaz visual inmediatamente
        renderMascotas();

        // Limpiar el formulario y resetear la variable de la foto
        formMascota.reset();
        fotoMascotaBase64 = "";
    });

    // 7. Renderizar las mascotas guardadas apenas cargue la página por primera vez
    renderMascotas();
});