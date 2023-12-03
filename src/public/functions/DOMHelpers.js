const subCategories = {
    Figura: [
        { value: 'Hasbro', text: 'Hasbro' },
        { value: 'Bandai', text: 'Bandai' },
        { value: 'Funko', text: 'Funko' }
    ],
    Comic: [
        { value: 'Marvel', text: 'Marvel' },
        { value: 'DC', text: 'DC' },
        { value: 'Star Wars', text: 'Star Wars' }
    ],
    Manga: [
        { value: 'Shonen', text: 'Shonen' },
        { value: 'Shojo', text: 'Shojo' },
        { value: 'Seinen', text: 'Seinen' },
        { value: 'Josei', text: 'Josei' }
    ],
    Otro: [
        { value: 'Indumentaria', text: 'Indumentaria' },
        { value: 'Accesorio', text: 'Accesorio' }
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

async function loaderOn(event){
    event.preventDefault();
    await hideAndShowBat();
    document.getElementById("createProductForm").submit();
}

async function confirmDelete(event) {
    //Asi tiene que ser el boton para que llame este metodo
    // <div class="title-additional-information">
    //     <form action="/product/<%=product.id%>?_method=delete" method="POST" onsubmit="confirmDelete(event)" >
    //         <button type="submit" name="delete" class="btn">ELIMINAR</button>
    //     </form>
    // </div>

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