const productos = require('../database/productos.json')

const productController = {
    index: function(request, response){
        response.render("product/productDetail")
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
        
        response.render("product/productList", {productos})
    
    },
    productListFilter: function(request, response){
        const {categoria, precio, subcategoria} = request.query

        const productosFiltrados = []
        if(categoria){
            productosFiltrados = productos.filter(producto => producto.categoria == categoria)
        }
    
        if(precio){
            productosFiltrados = productos.filter(producto => producto.precio >= precio)
        }

        if(subcategoria){
            productosFiltrados = productos.filter(producto => producto.subcategoria == subcategoria)
        }

        response.render("product/productList/:categoria:precio?/:subcategoria?", { productos: productosFiltrados, params: request.params })
    }

}

module.exports = productController;