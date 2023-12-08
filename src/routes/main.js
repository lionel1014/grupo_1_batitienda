const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index)
router.get('/pagina-no-existente', errorController.notFound);

module.exports = router;