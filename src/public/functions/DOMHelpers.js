const subCategories = {
    figuras: [
        { value: 'Hasbro', text: 'Hasbro' },
        { value: 'Bandai', text: 'Bandai' },
        { value: 'Funko', text: 'Funko' }
    ],
    comics: [
        { value: 'Marvel', text: 'Marvel' },
        { value: 'DC', text: 'DC' },
        { value: 'Star Wars', text: 'Star Wars' }
    ],
    mangas: [
        { value: 'Shonen', text: 'Shonen' },
        { value: 'Shojo', text: 'Shojo' },
        { value: 'Seinen', text: 'Seinen' },
        { value: 'Josei', text: 'Josei' }
    ],
    otros: [
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

async function loaderOn(event){
    document.getElementById("loaderBatman").style.display = "flex";
    await new Promise(resolve => setTimeout(resolve, 2000));
    document.getElementById("loaderBatman").style.display = "none";
    document.getElementById("createProductForm").submit();
}