const productos = require('../database/productos.json')

const mainController = {
    index: function(request, response){
        const productosfiltrados = productos.slice(0,8);
        response.render("index", {productos: productosfiltrados})
    }
}


module.exports = mainController;