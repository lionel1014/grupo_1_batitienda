const products = require("../database/productos.json");

const productController = {
    index: function(request, response){
        const productSelected = products.find(product => product.id == request.params.id)
        console.log(productSelected);
        response.render("product/productDetail",{product: productSelected})
    },
    productCar: function(request, response){
        response.render("product/productCar")
    },
    createProduct: function(request, response){
        response.render("product/createProduct")
    },
    editProduct: function(request, response){
        response.render("product/editProduct")
    },
    productList: function(request, response){
        
        response.render("product/editProduct")

    },
    // productListFilter: function(request, response){
    //     const {category, price} = request.query


    //     const productosFiltrados = []
    //     if(category){
    //         productosFiltrados = productos.filter(producto => producto.category == category)
    //     }

    //     if(price){
    //         productosFiltrados = productos.filter(producto => producto.price == price)
    //     }

    //     response.render("product/editProduct", {productos})
    // },
}

module.exports = productController;