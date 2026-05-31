# Informe de uso de Inteligencia Artificial

## Proyecto

**Nombre del proyecto:** PetCare Planner  
**Grupo:** Grupo 9  
**Modulo:** Web Estatica  
**Tecnologias utilizadas:** HTML, CSS y JavaScript vanilla

## Objetivo del uso de IA

Durante el desarrollo del proyecto se utilizo asistencia de inteligencia artificial como herramienta de apoyo para ordenar ideas, revisar errores y mejorar partes del codigo. La IA no reemplazo el trabajo del grupo, sino que funciono como una ayuda para entender mejor la estructura del proyecto, corregir problemas puntuales y tomar decisiones de organizacion.

En mi caso, el uso principal de IA estuvo relacionado con la seccion de **Inicio** del sitio PetCare Planner.

## Herramienta utilizada

Se utilizo ChatGPT/Codex y Gemini Pro como asistente para revisar archivos del proyecto, proponer mejoras y explicar pasos de trabajo con Git y Markdown.

## Partes del proyecto en las que se uso IA

La IA se utilizo especialmente para:

Sección Inicio (Julieta Rodriguez):
- Revisar la estructura inicial de `index.html`.
- Corregir problemas de codificacion en textos con acentos.
- Mejorar la organizacion visual del inicio.
- Agregar estilos responsive para que la pagina se vea mejor en escritorio y celular.
- Revisar el modo oscuro para mejorar el contraste y la legibilidad.
- Agregar una funcionalidad de tareas con JavaScript.
- Usar `localStorage` para guardar tareas y preferencia de modo oscuro.
- Revisar mensajes de Git y organizar commits.
- Crear este informe en formato Markdown.

Sección Mascotas (Alizon Gamboa):
- Revisar la estructura inicial de `perfil.html`
- Mejorar la parte visual con los estilos correspondientes.
- Implementar la lógica en JavaScript para la funcionalidad de edición de datos de las mascotas.
- Desarrollar e integrar la funcionalidad para eliminar registros de mascotas del sistema.
- Diseñar y adaptar los estilos CSS específicos para los botones y componentes de edición y eliminación.

Sección Agenda (Carmen Pally):
- Revisar la estructura semántica inicial de `agenda.html`
- Mejoras de accesibilidad.
- Asistencia en la conexión del formulario, con la memoria del navegador para guardar el array de tareas.
- Modularización del código JavaScript
- Uso del objeto Date de JavaScript para comparar fechas y clasificar tareas "vencidas", "hoy" y "futuras".



## Ejemplos de prompts utilizados

Algunas consultas realizadas fueron:

- "Estoy desarrollando la página de inicio de PetCare Planner para un proyecto grupal de HTML, CSS y JavaScript vanilla. Necesito ayuda para revisar la estructura semántica, mejorar el diseño responsive y asegurar que cumpla con la consigna del TP."
- "Necesito mejorar el modo oscuro porque algunos textos no tienen buen contraste. ¿Podés sugerir ajustes de colores para que la interfaz sea legible y accesible?"
- "Necesito organizar mis commits con Conventional Commits. ¿Qué mensajes puedo usar para separar cambios de HTML, CSS, JavaScript y documentación?"
- "Necesito usar `localStorage` de forma útil en el proyecto. ¿Qué datos del inicio tendría sentido guardar para que la funcionalidad esté relacionada con la idea de PetCare Planner?"

- "Necesito agregar un boton de editar y eliminar mascota en mi pagina, que ajustes necesarios debo realizar en mis archivos de perfil.html, perfil.css y prefil.js"
- "Actualmente la pagina index.html tiene el modo oscuro y al cambiar de pagina a la de registrar mascota o de agenda no se respeta este cambio, necesito que me digas que es lo que deberia hacer para que se respete el cambio de modo oscuro cuando cambio de paginas"


## Cambios realizados con ayuda de IA

### HTML

Se reviso la pagina de inicio para que tenga una estructura mas clara y semantica. Se mantuvieron etiquetas como `header`, `nav`, `main`, `section`, `aside`, `article`, `form` y `footer`. Tambien se agregaron labels y atributos de accesibilidad en el formulario y en algunos elementos dinamicos.

### CSS

Se trabajo sobre el archivo `assets/css/styles.css` para mejorar la estetica general, el modo oscuro, la adaptacion responsive y la distribucion de los bloques principales. Tambien se corrigieron problemas visuales del bloque de bienvenida, la tarjeta de mascota y el formulario de tareas.

Se actualizaron los estilos para dar soporte visual a las nuevas acciones de gestión de mascotas, asegurando que todos los campos a completar y todos los botones mantengan una coherencia y sigan con la estética general del sitio.

La IA me recomendó agregar el atributo aria-label en mi etiqueta <form> para asegurar que el formulario de la agenda cumpliera con las buenas prácticas básicas de accesibilidad exigidas por la consigna.

### JavaScript

Se revisó y mejoró el archivo `assets/js/main.js` para que las interacciones del inicio fueran más útiles y estuvieran relacionadas con la idea del proyecto.

Se programó la lógica necesaria en el archivo de `assets/js/perfil.js` para permitir que las funciones de editar y eliminar operen de manera dinámica, interactuando correctamente con los elementos de la interfaz.

## Decisiones tomadas por el grupo/persona

Aunque la IA propuso alternativas, las decisiones finales fueron revisadas manualmente. Por ejemplo, se decidio mantener una estructura simple, no usar frameworks, no usar CDN y conservar el estilo visual del proyecto del grupo.

Tambien se descartaron algunas propuestas visuales que no funcionaban bien, como ciertos intentos de dibujar la cola del gato con CSS. Finalmente se decidio quitar esa parte para dejar la interfaz mas prolija y avanzar con el proyecto.

## Aprendizajes

El uso de IA ayudo a comprender mejor:

- Como organizar archivos HTML, CSS y JS.
- Como escribir commits mas claros.
- Como usar Markdown para documentar el proyecto.
- Como aplicar `localStorage` en una funcionalidad real.
- Como revisar accesibilidad basica en formularios y navegacion.
- Como mejorar un sitio para que funcione en desktop y mobile.

## Limitaciones y revision humana

No se aceptaron todas las respuestas de la IA automaticamente. Algunas propuestas necesitaron correcciones porque no se veian bien visualmente o no coincidian con lo que se buscaba para el proyecto.

Por ejemplo uno de los desafíos fue que la IA, por defecto, sugería agrupar todo el código en un solo archivo genérico (como main.js). Como nuestro grupo definió una arquitectura modular (un archivo JS por página), tuvimos que redirigir constantemente a la IA para que respetara nuestra estructura y no rompiera lo que ya teníamos armado.

El codigo fue probado visualmente en el navegador y revisado antes de subirlo a la rama correspondiente. La IA fue utilizada como apoyo, pero el resultado final fue decidido y validado por integrantes del proyecto.

## Conclusion

La inteligencia artificial fue utilizada como una herramienta de asistencia para mejorar el desarrollo del proyecto, resolver dudas y documentar el proceso. Su uso permitio avanzar con mayor orden, pero las decisiones finales, pruebas y ajustes fueron realizados por el equipo.
