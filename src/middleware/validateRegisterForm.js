const multer = require("multer");
const PATH = require('path');
const { check } = require("express-validator")

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
    	.custom((value, { req }) => {
        // Compara el valor de confirmar_contrasena con el valor de contrasena
        if (value !== req.body.contrasena) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
]

module.exports = validateRegisterForm 