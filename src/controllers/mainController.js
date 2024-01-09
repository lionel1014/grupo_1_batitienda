const products = require("../database/productos.json");
const db = require('../database/models');

const mainController = {
    index: function(request, response){
        db.Product.findAll({include: ['product_category']})
            .then(products => {
                console.log("😭😭",products[0]);
            })
        response.render("index",{products: products.slice(0,12), title:''})
    }
}

module.exports = mainController;