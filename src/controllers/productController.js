const products = require("../helpers/productsFunctions");

const productController = {

    index: function(request, response){
        const productSelected = products.findProductByRequest(request);
        response.render("product/productDetail",{product: productSelected, title: ''})
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

        if (Object.keys(request.query).length == 0 ) {
            response.render("product/productList",{products: products.getAllProducts(), title: ''});
            return;
        }

        let productToFilter = products.filterProducts(request);

        response.render("product/productList",{products: productToFilter, title: ''});
    }
}

module.exports = productController;