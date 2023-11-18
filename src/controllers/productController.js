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
        response.send("pagina en curso")
    }
}

module.exports = productController;