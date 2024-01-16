const { check, param, validationResult, body} = require('express-validator');
const Product = require("../models/ProductService")

const validateProduct = [
    body("titulo").notEmpty().withMessage("Debe tener un nombre el producto").bail()
    .isLength({min: 3}).withMessage("Debe ser mayor a 3 caracteres").bail()
    .custom( titulo => {
        const isTitleInUse = Product.getAllProducts().some( product => product.title == titulo)
        if (isTitleInUse) {
            throw new Error("Ya existe un producto con ese titulo")
        }
    })
];

module.exports = validateProduct;