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

function mensaje(event){
    const select =  document.getElementById("subcategoria")
    const selectedCategory = event.target?.value;
    const selectedSubCategories = subCategories[selectedCategory];
    
    if(selectedSubCategories.length == 0) return
    
    const defaultOption = document.createElement("option");
    select.innerHTML = "";//limpia el select
    defaultOption.value = "";
    defaultOption.text = "Ingresa una subcategoría";
    select.add(defaultOption)

    selectedSubCategories.forEach(subCategory => {
        const option = document.createElement("option");
        option.value = subCategory.value;
        option.text = subCategory.text;
        select.add(option)
    });
}