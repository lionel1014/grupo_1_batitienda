const express = require("express");
const { url } = require("inspector");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log("Servidor funcionando en el purto " + PORT);
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/index.html"));
});

app.get("/login", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/user/login.html"));
});

app.get("/register", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/user/register.html"));
});

app.get("/productCar", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/product/productCar.html"));
});

app.get("/productDetail", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/product/productDetail.html"));
});

app.get("/createProduct", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./views/product/createProduct.html"));
});

app.get("*", (request, response) => {
  response.redirect("/");
});


