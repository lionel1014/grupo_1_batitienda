const express = require("express");
const multer = require("multer");
const PATH = require('path');
const userController = require("../controllers/userController");
const guessMiddleware = require("../middleware/guessMiddleware");
const authMiddleware = require("../middleware/authmiddleware");
const updateCookieMiddleware = require("../middleware/updateCookieMiddleware")
const validateRegisterForm = require("../middleware/validateRegisterForm")
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

router.get("/", guessMiddleware, userController.register);
router.get("/login", guessMiddleware, userController.login);
router.get("/profile", authMiddleware, userController.profile)

router.get("/api/users", userController.list);
router.get("/api/users/search", userController.search);
router.get("/api/users/:id", userController.show);
router.post("/api/users", userController.store);
router.put("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);

router.post("/", validateRegisterForm, userController.createProcess);
router.post("/login", userController.loginProcess);
router.post("/logout", userController.logout);
router.put("/profile", authMiddleware, userController.editProfile)
router.put("/img/:id",  uploadFile.single("img-usuario"), updateCookieMiddleware, userController.changeUserImage)
router.delete('/profile', userController.deleteSelectedUser);




module.exports = router;