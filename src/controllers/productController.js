const products = require("../helpers/productsFunctions");
const fs = require('fs');
const bodyParser = require('body-parser');
const productsDB = require("../database/productos.json");

const productController = {

    index: function(request, response){
        const productSelected = products.findProductByRequest(request);
        const productsRelationed = products.findProductBySubcategory(productSelected.subcategory);
        //null , [pro1,ppr2]
        // if(productsRelationed == null){ //si no viene algun producto, que hago?

        // }

        response.render("product/productDetail",{product: productSelected, title: '' , productsRelationed})
    },

    carPage: function(request, response){
        response.render("product/productCar")
    },

    createPage: function(request, response){
        response.render("product/createProduct", {title: '- crear producto'})
    },

    create: function(request,response){
        products.createProduct(request, response);
    },

    editPage: function(request, response){
        const product = products.findProductByRequest(request);
        response.render("product/editProduct",{product})
    },

    update: function(request,response){
        products.updateProduct(request, response);
    },

    delete: function(request, response){
        products.deleteProduct(request,response)
    },

    listPage: function(request, response){

  // Obtén los parámetros de la consulta
//         const categoria = request.query.category;
//         const subcategory = request.query.subcategory;
//         const maxPrice = request.query.price;

//   // Filtra los productos según los parámetros
//         const productsFiltered = productsDB.filter(producto => {
//         return (!category || producto.category === categoria) &&
//            (!subcategory || producto.subcategory === subcategory) &&
//            (!maxPrice || producto.price <= parseFloat(maxPrice));
//         });

//   // Puedes enviar los productos filtrados como respuesta
//         response.json(productsFiltered);

        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products: products.getAllProducts(), title: ''});
            return;
        }

        let productToFilter = products.filterProducts(request);

        response.render("product/productList",{products: productToFilter, title: ''});
    }
}

module.exports = productController;