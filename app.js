const express = require("express");
const { url } = require("inspector");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Servidor funcionando en el purto " + PORT);
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/index.html"));
});

app.get("/login", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/login.html"));
});

app.get("/register", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/register.html"));
});

app.get("/productCar", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/productCar.html"));
});

app.get("/productDetail", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});

app.get("*", (request, response) => {
  response.redirect("/");
});


