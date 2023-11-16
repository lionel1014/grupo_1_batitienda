const express = require("express");
const path = require("path");

const mainRoutes = require("./routes/main.js")
const userRoutes = require("./routes/user.js")
const productRoutes = require("./routes/product.js")

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.resolve(__dirname, "./views"));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 😊 " + PORT);
});

app.use("/", mainRoutes);
app.use("/user",userRoutes)
app.use("/product",productRoutes)

app.get("*", (request, response) => {
  response.redirect("/");
});


