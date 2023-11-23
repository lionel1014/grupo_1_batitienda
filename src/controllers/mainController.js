const productos = require('../database/productos.json')

const mainController = {
    index: function(request, response){

        response.render("index", {productos})
    }
}


module.exports = mainController;