const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/productCar", productController.productCar)
router.get("/createProduct", productController.createProduct)
router.get("/editProduct", productController.editProduct)
router.get("/listProduct", productController.productList)
router.get("/:id", productController.index)
// router.get("/listProduct/:category&:price&subcategory", productController.productListFilter)

module.exports = router;