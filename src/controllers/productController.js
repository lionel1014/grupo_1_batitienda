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
    productList: function(request, response){
        response.render("product/productList")
    }
}

module.exports = productController;