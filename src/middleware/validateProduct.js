const {body} = require('express-validator');
const ProductService = require("../models/ProductService")

const validateProduct = [
    body("titulo").notEmpty().withMessage("Debe tener un nombre el producto").bail()
    .isLength({min: 3}).withMessage("Debe ser mayor a 3 caracteres").bail()
    .custom( titulo => {
        ProductService.getAllProducts()
            .then(products => {
                const isTitleInUse = products.some( product => product.title == titulo)
                console.log(isTitleInUse)
                if (isTitleInUse) {
                    throw new Error("Ya existe un producto con ese titulo")
                }
            })
            .catch(error => {
                console.error(error);
            });
    })
];

module.exports = validateProduct;