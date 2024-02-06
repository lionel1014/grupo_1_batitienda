const multer = require("multer");
const PATH = require('path');
const { check } = require("express-validator")

let db = require("../database/models")

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

const onlyLettersRegex = /^[A-Za-z]+$/;

let validateRegisterForm = [
	uploadFile.single("imagen"),
	check("nombre")
		.notEmpty().withMessage("Debes completar el nombre")
		.isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 letras")
		.custom(value => {
			if (!onlyLettersRegex.test(value)) {
				return Promise.reject('El nombre solo debe contener letras');
			}
			return true;
		}).withMessage("El nombre solo debe contener letras"),

	check("apellido")
		.notEmpty().withMessage("Debes completar el apellido").bail()
		.isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 letras").bail()
		.custom(value => {
			if (!onlyLettersRegex.test(value)) {
				return Promise.reject('El apellido solo debe contener letras');
			}
			return true;
		}),

	check("correo")
		.notEmpty().withMessage("Debes completar el correo").bail()
		.normalizeEmail()
		.isEmail().withMessage("Debes ingresar un correo valido").bail()
		.custom(async (value) => {
			// Verificar si el correo electrónico ya está registrado en la base de datos
			const usuarioExistente = await db.User.findOne({ where: { email: value } });
			
			if (usuarioExistente) {
			  return Promise.reject('Este correo electrónico ya está registrado');
			}
		
			return true;
		}),

	check("usuario")
		.notEmpty().withMessage("Debes completar el nombre de usuario").bail()
		.isLength({min : 5}).withMessage("El nombre de usuario debe tener minimo 5 caracteres")
		.custom(async (value) => {
			// Verificar si el correo electrónico ya está registrado en la base de datos
			const usuarioExistente = await db.User.findOne({ where: { user_name: value } });
			
			if (usuarioExistente) {
			  return Promise.reject('Este nombre de usuario ya está en uso');
			}
		
			return true;
		}),
	
	check("contrasena")
		.notEmpty().withMessage("Debes completar la contraseña").bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)
		.withMessage('La contraseña debe contener al menos una letra mayúscula, un número y un símbolo'),
	
	check("confirmar_contrasena")
		.notEmpty().withMessage("Debes confirmar la contraseña").bail()
    	.custom((value, { req }) => {
			// Compara el valor de confirmar_contrasena con el valor de contrasena
			if (value !== req.body.contrasena) {
				return Promise.reject('Las contraseñas no coinciden');
			}
			return true;
        }),

	check("imagen")
		.custom((value, { req }) => {
			// Verifica si se ha seleccionado un archivo (imagen)
			if (!req.file) {
				// Si no se ha seleccionado una imagen, devuelve el mensaje de error
				return Promise.reject ('Debes seleccionar una imagen');
			}

			// Verifica la extensión del archivo
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
			const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

			if (!allowedExtensions.includes(fileExtension)) {
				// Si la extensión no está permitida, devuelve el mensaje de error
				return Promise.reject('Formato de imagen no válido. Utiliza JPG, JPEG, PNG o GIF.');
			}

			// Verifica el tipo MIME del archivo
			const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
			if (!allowedMimeTypes.includes(req.file.mimetype)) {
				// Si el tipo MIME no está permitido, devuelve el mensaje de error
				return Promise.reject ('Tipo de imagen no válido.');
			}
			return true;
		})
]

module.exports = validateRegisterForm 