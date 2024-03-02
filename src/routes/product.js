const express = require("express");
const multer = require('multer');
const PATH = require('path');

const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authmiddleware");
const validateProduct = require("../middleware/validateProduct");

const storage = multer.diskStorage({
	destination: (req,file,cd) => {
		cd(null, PATH.join(__dirname, '../public/images/img_products'))
	},
	filename: (req,file,cd) =>{
		const uniqueSuffix = Date.now();
		const fileExtension = PATH.extname(file.originalname);
		cd(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
	}
});
const uploadFile = multer({storage});

/* RUTAS PARA OBTENER LAS PÁGINAS*/
router.get("/productCar", productController.carPage);
router.get("/createProduct", authMiddleware, productController.createPage);
router.get("/editProduct/:id", authMiddleware,productController.editPage);
router.get("/listProduct", productController.listPage);
router.get("/:id", productController.index);

router.get("/api/products", productController.list);
router.get("/api/products/search", productController.search);
router.get("/api/products/:id", productController.show);
router.post("/api/products", productController.store);
router.put("/api/products/:id", productController.update);
router.delete("/api/products/:id", productController.delete);


router.put("/:id", uploadFile.single("imagen"), validateProduct, productController.updateProduct)
router.post("/", uploadFile.single("imagen"), validateProduct, productController.createProduct)
router.delete("/:id", productController.deleteProduct)
//TODO: falta el router.delete()

module.exports = router;