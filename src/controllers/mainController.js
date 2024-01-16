const ProductService = require("../models/ProductService");

const mainController = {
    index: function(request, response){
        ProductService.getAllProducts()
            .then(products => {
                response.render("index",{products: products.slice(0,12), title:''})
            })
            .catch(error => {
                console.error(error);
            });
    }
}

module.exports = mainController;