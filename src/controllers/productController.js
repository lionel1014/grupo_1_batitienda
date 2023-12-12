const Product = require("../models/Product");

const productController = {

    index: function(request, response){
        const productSelected = Product.findProductByRequest(request);
        const productsRelationed = Product.findProductBySubcategory(productSelected.subcategory);
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
        Product.createProduct(request, response);
    },

    editPage: function(request, response){
        const product = Product.findProductByRequest(request);
        response.render("product/editProduct",{product})
    },

    update: function(request,response){
        Product.updateProduct(request, response);
    },

    delete: function(request, response){
        Product.deleteProduct(request,response)
    },

    listPage: function(request, response){

        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products: Product.getAllProducts(), title: ''});
            return;
        }

        let productToFilter = Product.filterProducts(request);

        response.render("product/productList",{products: productToFilter, title: ''});
    }
}

module.exports = productController;