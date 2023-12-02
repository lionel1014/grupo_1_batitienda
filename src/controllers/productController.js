const products = require("../database/productos.json");

const productController = {
    index: function(request, response){
        const productSelected = products.find(product => product.id == request.params.id)
        response.render("product/productDetail",{product: productSelected})
    },
    productCar: function(request, response){
        response.render("product/productCar")
    },
    createProduct: function(request, response){
        response.render("product/createProduct")
    },
    create: function(request,response){
        response.send("hola gente")
    },
    editProduct: function(request, response){
        response.render("product/editProduct")
    },
    productList: function(request, response){
        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products});
            return;
        }
        let productToFilter = products

        const {category, subcategory, price} = request.query

        if(category){
            productToFilter = productToFilter.filter(producto => producto.category == category)
        }
        if(subcategory){
            productToFilter = productToFilter.filter(producto => producto.subcategory == subcategory)
        }
        if(price){
            productToFilter = productToFilter.filter(producto => producto.price == price)
        }
        response.render("product/productList",{products: productToFilter});

    }
}

module.exports = productController;