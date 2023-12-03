const productsDB = require("../database/productos.json");
const PATH = require('path');
const productsFilePath = PATH.join(__dirname, '../database/productos.json');

const products = {
    findProductByRequest :function ({params}){
        const product = productsDB.find(product => product.id == params.id);
        return product;
    }
}

module.exports = products