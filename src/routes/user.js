const express = require("express");
const multer = require("multer");
const PATH = require('path');
const userController = require("../controllers/userController");
const guessMiddleware = require("../middleware/guessMiddleware");

const storage = multer.diskStorage({
	destination: (req,file,cd) => {
		cd(null, PATH.join(__dirname, '../public/images/img_profile'))
	},
	filename: (req,file,cd) =>{
		const uniqueSuffix = Date.now();
		const fileExtension = PATH.extname(file.originalname);
		cd(null, `${file.fieldname}-profile${uniqueSuffix}${fileExtension}`);
	}
});

const router = express.Router();
const uploadFile = multer({storage});

router.get("/", guessMiddleware,userController.register);
router.get("/login", userController.login);
router.post("/", uploadFile.single("imagen") ,userController.createProcess);
router.post("/login", userController.loginProcess);
router.post("/logout", userController.logout);
router.get("/editPerfil", userController.editPerfil)

module.exports = router;