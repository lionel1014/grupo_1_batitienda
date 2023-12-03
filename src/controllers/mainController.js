const products = require("../database/productos.json");

const mainController = {
    index: function(request, response){
        response.render("index",{products: products.slice(0,8), title: ''})
    }
}

module.exports = mainController;