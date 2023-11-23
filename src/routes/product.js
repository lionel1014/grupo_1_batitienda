const express = require("express");
const productController = require("../controllers/productController");


const router = express.Router();

router.get("/", productController.index)
router.get("/productCar", productController.productCar)
router.get("/createProduct", productController.createProduct)
router.get("/listProduct", productController.productList)
router.get("/listProduct/:categoria:precio?/:subcategoria?", productController.productListFilter)
module.exports = router;