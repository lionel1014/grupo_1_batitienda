const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors'); // Importar el módulo de CORS

const mainRoutes = require("./routes/main.js");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");

const userLoggedMiddleware = require('./middleware/userLoggedMiddleware.js');

const app = express();
const PORT = 3001;

app.set('views', path.resolve(__dirname, "./views"));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Agregar middleware de CORS
app.use(session({
  secret: "Shh, It's a secreet",
  resave: false,
  saveUninitialized: false,
}));
app.use(cookies());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware);

app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 😊 " + PORT);
});

/* RUTAS */
app.use("/", mainRoutes);
app.use("/user",userRoutes)
app.use("/product",productRoutes)

app.get("*", (request, response) => {
  response.redirect("/");
});



