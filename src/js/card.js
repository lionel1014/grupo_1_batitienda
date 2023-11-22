const archivo = require('../../database/productos.json')
const productosLista = archivo.lista_productos

let createCard = {
    filtrarProductos: function (propiedad, valor) {
        let lista = productosLista
        return lista.filter(objeto => objeto.hasOwnProperty(propiedad) && objeto[propiedad] === valor);
    },

    crearTarjetaProducto: function (idNum) {
        
    let producto = this.filtrarProductos( 'codigo', idNum)
    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('producto');
    
    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.titulo;
    imagen.classList.add('producto-image');

    const descripcion = document.createElement('div');
    descripcion.classList.add('producto-descripcion');

    const nombre = document.createElement('h2');
    nombre.textContent = producto.titulo;
    nombre.classList.add('producto-nombre')

    const precioCarro = document.createElement('div');
    descripcion.classList.add('precio-carro');

    const precio = document.createElement('p');
    precio.textContent = `$${producto.precio}`;
    precio.classList.add("producto-precio")

    const carrito = document.createElement('p');
    precio.textContent = `Añadir `;
    precio.classList.add("add-carrito")

    const btn = document.createElement('i');
    btn.classList.add('fa-solid fa-cart-shopping carro-producto')

    const descripcionText = document.createElement('p');
    descripcionText.textContent = `${producto.descripcion}`

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(descripcion);
    descripcion
    .appendChild(nombre);
    descripcion
    .appendChild(descripcionText);
    descripcion
    .appendChild(precioCarro);
    precioCarro.appendChild(precio);
    precioCarro.appendChild(carrito);
    carrito.appendChild(btn);

    return tarjeta;
},

agregarTarjetasAlContenedor: function (propiedad, valor) {
    const productosFiltrados = this.filtrarProductos(propiedad, valor);

    const contenedor = document.getElementById('productos-container');

    productosFiltrados.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto.codigo);
        contenedor.appendChild(tarjeta);

        // Agregar que redirja al detalle de producto
        tarjeta.addEventListener('click', () => {
            
        });
    });
}
}

module.exports = createCard


<ul class="sub-menu">
                <li><a href="/product/listProduct?category=Figuras&brand=Hasbro">Hasbro</a></li>
                <li><a href="">Bandai</a></li>
                <li><a href="/product/listProduct?category=Funko">Funko</a></li>
                <li><a href="/product/listProduct?category=Otros">Otros</a></li>
</ul>

productList: function(request, response){
        
    response.render("product/editProduct", {productos})

},
productListFilter: function(request, response){
    const {category, price} = request.query


    const productosFiltrados = []
    if(category){
        productosFiltrados = productos.filter(producto => producto.category == category)
    }

    if(price){
        productosFiltrados = productos.filter(producto => producto.price == price)