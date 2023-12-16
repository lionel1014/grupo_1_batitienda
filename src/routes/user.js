const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.register)
router.get("/login", userController.login)
router.get("/editPerfil", userController.editPerfil)

module.exports = router;