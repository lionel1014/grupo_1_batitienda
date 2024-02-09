const {check, body} = require('express-validator');

const validateProduct = [
    check("titulo")
        .notEmpty().withMessage("Debes completar el titulo")
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 letras"),

    check("descripcion")
        .notEmpty().withMessage("Debes completar la descripcion")
        .isLength({ min: 20 }).withMessage("El nombre debe tener al menos 20 letras"),

    body('imagen')
        .custom((value, { req }) => {
			if (!req.file) {
				return Promise.reject ('Debes seleccionar una imagen');
			}
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
			const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

			if (!allowedExtensions.includes(fileExtension)) {
				return Promise.reject('Formato de imagen no válido. Utiliza JPG, JPEG, PNG o GIF.');
			}
			const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
			if (!allowedMimeTypes.includes(req.file.mimetype)) {
				return Promise.reject ('Tipo de imagen no válido.');
			}
			return true;
		}) 
];

module.exports = validateProduct;