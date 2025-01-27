// Selección dinámica de opciones
const imageOption = document.getElementById("image-option");
const uploadContainer = document.getElementById("upload-container");
const colorPickerContainer = document.getElementById("color-picker-container");
const defaultImageContainer = document.getElementById("default-image-container");
const defaultImageField = document.getElementById("default-image-field");
const colorPicker = document.getElementById("color-picker");
const fileInput = document.getElementById("file-input");

// Cambiar la visibilidad según la selección
imageOption.addEventListener("change", (event) => {
    const value = event.target.value;

    // Ocultar todos los contenedores primero
    uploadContainer.classList.add("hidden");
    colorPickerContainer.classList.add("hidden");
    defaultImageContainer.classList.add("hidden");

    // Resetear valores en los campos
    defaultImageField.value = "";
    colorPicker.name = "color"; // Restaurar el nombre por defecto
    fileInput.value = ""; // Limpiar el input de archivos

    // Mostrar el contenedor adecuado según la opción seleccionada
    if (value === "upload") {
        uploadContainer.classList.remove("hidden");
    } else if (value === "solid-color") {
        colorPickerContainer.classList.remove("hidden");
        defaultImageField.value = ""; // Asegurarse de no enviar un valor predeterminado
    } else if (value === "default") {
        defaultImageContainer.classList.remove("hidden");
        defaultImageField.value = "X"; // Indicar que se usará la imagen predeterminada
        colorPicker.name = "ignore-color"; // Cambiar el nombre para evitar envío del color
    }
});

// Validación de formato de archivo
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; // Extensiones permitidas
        if (!allowedExtensions.test(file.name)) {
            alert("Por favor, selecciona un archivo JPG o PNG.");
            fileInput.value = ""; // Reiniciar el campo de archivo
        }
    }
});

// Manejo de envío con redirección
document.querySelector(".create-plot-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("/api/plots", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            window.location.href = "/views/plot-list";
        } else {
            const errorData = await response.json();
            alert(`Error al crear el terreno: ${errorData.error || "Error desconocido"}`);
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("No se pudo crear el terreno. Por favor, inténtalo de nuevo.");
    }
});
