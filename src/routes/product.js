const express = require("express");
const multer = require('multer');
const PATCH = require('path')

const router = express.Router();

const productController = require("../controllers/productController");

const storage = multer.diskStorage({
	destination: (req,file,cd) => {
		cd(null, PATCH.join(__dirname, '../public/images/img_products'))
	},
	filename: (req,file,cd) =>{
		const uniqueSuffix = Date.now();
		const fileExtension = PATCH.extname(file.originalname);
		cd(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
	}
});
const uploadFile = multer({storage});


// router.post('/', upload.single('form-image'), productsController.store);  el parametro de .single es el name del input type file

/* RUTAS PARA OBTENER LAS PÁGINAS*/
router.get("/productCar", productController.productCar);
router.get("/createProduct", productController.createProduct);
router.get("/editProduct", productController.editProduct);
router.get("/listProduct", productController.productList);
router.get("/:id", productController.index);

router.post("/", uploadFile.single("imagen"), productController.create)

module.exports = router;