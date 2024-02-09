const subCategories = {
    Figura: [
        { value: '20', text: 'Hasbro' },
        { value: '18', text: 'Bandai' },
        { value: '19', text: 'Funko' }
    ],
    Comic: [
        { value: '16', text: 'Marvel' },
        { value: '15', text: 'DC' },
        { value: '17', text: 'Star Wars' }
    ],
    Manga: [
        { value: '21', text: 'Shonen' },
        { value: '22', text: 'Shojo' },
        { value: '23', text: 'Seinen' },
        { value: '24', text: 'Josei' }
    ],
    Otro: [
        { value: '25', text: 'Indumentaria' },
        { value: '26', text: 'Accesorio' }
    ]
};

function changeSubcategories(event){
    const selectCategoryHTML =  document.getElementById("subcategoria")
    const categorySelected = event.target?.value;
    const subCategoryOptiones = subCategories[categorySelected];
    
    if(subCategoryOptiones.length == 0) return
    
    const defaultOption = document.createElement("option");
    selectCategoryHTML.innerHTML = "";//limpia el select
    defaultOption.value = "";
    defaultOption.text = "Ingresa una subcategoría";
    selectCategoryHTML.add(defaultOption)

    subCategoryOptiones.forEach(subCategory => {
        const option = document.createElement("option");
        option.value = subCategory.value;
        option.text = subCategory.text;
        selectCategoryHTML.add(option)
    });
}

async function hideAndShowBat(){
    document.getElementById("loaderBatman").style.display = "flex";
    await new Promise(resolve => setTimeout(resolve, 1000));
    document.getElementById("loaderBatman").style.display = "none";
}


function showError(inputElement, message) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.className === "error-message") {
        errorElement.remove();
    }

    const newErrorElement = document.createElement("div");
    newErrorElement.className = "error-message";
    newErrorElement.innerHTML = message;


    inputElement.parentNode.insertBefore(newErrorElement, inputElement.nextElementSibling);
}


function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(element => element.remove());
}


function validateNombre(nombre) {
    return nombre.length >= 5;
}

function validateDescripcion(descripcion) {
    return descripcion.length >= 20;
}

function validateImagen(fileName) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
}

function validateForm() {
    clearErrors();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagenInput = document.getElementById("imagen");
    const imagenFileName = imagenInput.value;

    if (!validateNombre(titulo)) {
        showError(document.getElementById("titulo"), "El nombre debe tener al menos 5 caracteres.");
        return false;
    }


    if (!validateDescripcion(descripcion)) {
        showError(document.getElementById("descripcion"), "La descripción debe tener al menos 20 caracteres.");
        return false;
    }

    // if (imagenFileName !== "" && !validateImagen(imagenFileName)) {
    //     showError(document.getElementById("imagen"), "La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).");
    //     return false;
    // }

    return true;
}

async function loaderOn(event) {
    event.preventDefault();

    if (validateForm()) {
        await hideAndShowBat();
        document.getElementById("createProductForm").submit();
    }
}



async function confirmDelete(event) {

    event.preventDefault();

    // Pregunta al usuario si realmente desea eliminar el producto
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este producto?");

    if (confirmation) {
        // Si el usuario hace clic en "Aceptar", espera 1 segundos antes de enviar el formulario
        await hideAndShowBat();

        // Obtén el formulario y envíalo
        const form = event.target.closest('form');
        form.submit();
    }

    // Si el usuario hace clic en "Cancelar" o si ha pasado el tiempo de espera, no se envía el formulario
    return confirmation;
}

function menuToggle() {
    const toggleMenu = document.querySelector("#menu-profile-desktop");
    toggleMenu.classList.toggle("active");
    // Agrega un listener para el clic en el documento
    setTimeout(() => {
        document.addEventListener("click", handleDocumentClick);
    }, 500);
}

function handleDocumentClick(event) {
    const toggleMenu = document.querySelector("#menu-profile-desktop");
    const targetElement = event.target;

    if (!toggleMenu.contains(targetElement)) {
        toggleMenu.classList.remove("active");
        document.removeEventListener("click", handleDocumentClick);
    }
}

function cambiarImgPerfil() {
    // Obtener el formulario y enviarlo
    const formulario = document.getElementById("subirImgFormulario");
    formulario.submit();
}