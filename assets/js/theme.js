const storageKeyTheme = "petcareTheme";

if (localStorage.getItem(storageKeyTheme) === "dark") {
    document.body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.querySelector("#toggle-theme");
    
    if (themeButton) {
        updateThemeButtonText(themeButton); 

        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDarkMode = document.body.classList.contains("dark-mode");
            
            localStorage.setItem(storageKeyTheme, isDarkMode ? "dark" : "light");
            
            updateThemeButtonText(themeButton);
        });
    }
});

function updateThemeButtonText(button) {
    const isDarkMode = document.body.classList.contains("dark-mode");
    button.textContent = isDarkMode ? "Activar modo claro" : "Activar modo oscuro";
    button.setAttribute("aria-pressed", String(isDarkMode));
}