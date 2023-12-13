const express = require("express");
const userController = require("../controllers/userController");
const guessMiddleware = require("../middleware/guessMiddleware");

const router = express.Router();

router.get("/", guessMiddleware,userController.register);
router.get("/login", userController.login);
router.post("/login", userController.loginProcess);

module.exports = router;