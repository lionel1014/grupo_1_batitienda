const express = require("express");
const multer = require("multer");
const PATH = require('path');
const { check } = require("express-validator")
const userController = require("../controllers/userController");
const guessMiddleware = require("../middleware/guessMiddleware");
const authMiddleware = require("../middleware/authmiddleware");
const updateCookieMiddleware = require("../middleware/updateCookieMiddleware")
const router = express.Router();

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

const uploadFile = multer({storage});

let validateRegisterForm = [
	uploadFile.single("imagen"),
	check('imagen')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Debes seleccionar una imagen');
      }
      return true;
    }),
	check("nombre")
		.notEmpty().withMessage("Debes completar el nombre"),
	check("apellido")
		.notEmpty().withMessage("Debes completar el apellido"),
	check("correo")
		.notEmpty().withMessage("Debes completar el correo").bail()
		.normalizeEmail()
		.isEmail().withMessage("Debes ingresar un correo valido"),
	check("usuario")
		.notEmpty().withMessage("Debes completar el nombre de usuario").bail()
		.isLength({min : 5}).withMessage("El nombre de usuario debe tener minimo 5 caracteres"),
	check("contrasena")
		.notEmpty().withMessage("Debes completar la contraseña").bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
		.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)
		.withMessage('La contraseña debe contener al menos una letra mayúscula y un símbolo'),
	check("confirmar_contrasena")
		.notEmpty().withMessage("Debes confirmar la contraseña").bail()
		.equals('contrasena').withMessage('Las contraseñas no coinciden')
]


router.get("/", guessMiddleware, userController.register);
router.get("/login", guessMiddleware, userController.login);
router.get("/profile", authMiddleware, userController.profile)
router.post("/", validateRegisterForm, userController.createProcess);
router.post("/login", userController.loginProcess);
router.post("/logout", userController.logout);
router.put("/img/:id",  uploadFile.single("img-usuario"), updateCookieMiddleware, userController.changeUserImage)

module.exports = router;