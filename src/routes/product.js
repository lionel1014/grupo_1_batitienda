const express = require("express");
const multer = require('multer');

const productController = require("../controllers/productController");

const storage = multer.diskStorage({
	destination: (req,file,cd) => {
		cd(null, path.join(__dirname, '../public/images/img_products'))
	},
	filename: (req,file,cd) =>{
        console.log(file);
		const uniqueSuffix = Date.now();
		const fileExtension = path.extname(file.originalname);
		cd(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
	}
})

const uploadFile = multer({storage});
const router = express.Router();

// router.post('/', upload.single('form-image'), productsController.store);  el parametro de .single es el name del input type file

router.get("/productCar", productController.productCar);
router.get("/createProduct", productController.createProduct);
router.get("/editProduct", productController.editProduct);
router.get("/listProduct", productController.productList);
router.get("/listProduct/:category/:price/:subcategory", productController.productListFilter);
router.get("/:id", productController.index);

module.exports = router;