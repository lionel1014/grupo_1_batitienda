const express = require("express");
const multer = require('multer');
const PATH = require('path');

const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authmiddleware");

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

router.put("/:id", uploadFile.single("imagen"), productController.update)
router.post("/", uploadFile.single("imagen"), productController.create)
router.delete("/:id", productController.delete)
//TODO: falta el router.delete()

module.exports = router;