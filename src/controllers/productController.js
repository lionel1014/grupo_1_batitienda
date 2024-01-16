const ProductService = require("../models/ProductService");

const productController = {

    index: function(request, response){
        ProductService.findProductByRequest(request)
            .then(async productSelected => {
                const productsRelationed = await ProductService.findProductBySubcategory(productSelected?.product_category_id);
                response.render("product/productDetail",{product: productSelected, title: '' , productsRelationed})
            })
    },

    carPage: function(request, response){
        response.render("product/productCar")
    },

    createPage: function(request, response){
        response.render("product/createProduct", {title: '- crear producto'})
    },

    create: function(request, response){
        ProductService.createProduct(request)
            .then( productCreatedId => {
                if (Number.isInteger(productCreatedId)) {
                    response.redirect(`/product/${productCreatedId}`)
                }else{
                    response.redirect(`/`)
                }
            })
    },

    editPage: function(request, response){
        ProductService.findProductByRequest(request)
            .then(async productSelected => {
                response.render("product/editProduct",{product: productSelected})
            })
    },

    update: function(request,response){
        ProductService.updateProduct(request)
            .then( productEditedId => {
                if (productEditedId) {
                    response.redirect(`/product/${productEditedId}`)
                }else{
                    response.redirect(`/`)
                }
            })

    },

    delete: function(request, response){
        ProductService.deleteProduct(request)
            .then( wasProductDeleted => {
                if (wasProductDeleted == true) {
                    response.redirect(`/user/profile`)
                }else{
                    response.redirect(`/`)
                }
            })
    },

    listPage: function(request, response){

        if (Object.keys(request.query).length == 0 ) {
            ProductService.getAllProducts()
                .then(products => {
                    response.render("product/productList",{products, title: ''});
                })
            return;
        }

        ProductService.filterProducts(request)
            .then(filterProducts => {
                response.render("product/productList",{products: filterProducts, title: ''});
            })

    }
}

module.exports = productController;