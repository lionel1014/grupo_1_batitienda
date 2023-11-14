const express = require("express");
const router = express.Router();
//TODO: crear los controladors y rutas para los demás archivos
router.get("/",(request,response) =>{
    response.render("index");
})

module.exports = router;