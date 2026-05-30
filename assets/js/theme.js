// theme.js

const storageKeyTheme = "petcareTheme";

// 1. Aplicar el tema INMEDIATAMENTE (esto evita el "parpadeo" blanco al cambiar de página)
if (localStorage.getItem(storageKeyTheme) === "dark") {
    document.body.classList.add("dark-mode");
}

// 2. Configurar el botón de cambio de tema cuando el HTML termine de cargar
document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.querySelector("#toggle-theme");
    
    // Solo agregamos el evento si el botón existe en esta página en particular
    if (themeButton) {
        updateThemeButtonText(themeButton); // Actualizar texto inicial

        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDarkMode = document.body.classList.contains("dark-mode");
            
            // Guardamos la preferencia
            localStorage.setItem(storageKeyTheme, isDarkMode ? "dark" : "light");
            
            // Actualizamos el texto del botón
            updateThemeButtonText(themeButton);
        });
    }
});

// Función para cambiar el texto del botón
function updateThemeButtonText(button) {
    const isDarkMode = document.body.classList.contains("dark-mode");
    button.textContent = isDarkMode ? "Activar modo claro" : "Activar modo oscuro";
    button.setAttribute("aria-pressed", String(isDarkMode));
}