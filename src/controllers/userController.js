const User = require("../models/User");
const Product = require("../models/Product")
const bcrypt = require("bcrypt")

const userController = {
    login: function(request, response){
        console.log(request.session);
        response.render("user/login", {title : "Login 😒"})
    },
    register: function(request, response){
        response.render("user/register", {title : "Registrar 😁"})
    },

    createProcess: function(request, response){
        User.create(request.body, request.file)
        response.redirect("/user/register")
    },

    loginProcess: function (request, response) {
        const userToLogin = User.findByField('email', request.body.email);
    
        if (!userToLogin) {
            return response.render("user/login", {
                title: "Login 😒",
                errors: {
                    email: {
                        msg: "No se encontró ese email registrado"
                    }
                }
            });
        };
        const isOkPassword = bcrypt.compareSync(request.body.contrasena, userToLogin.password);
        if (!isOkPassword)
            return response.render("user/login", {
                title: "Login 😒",
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas."
                    }
                }
            });

        // delete userToLogin.password;
        request.session.userLogged = userToLogin;
        response.redirect("/")
    },

    profile: function ( request, response){
        const allUsers = User.getData();
        const allProducts = Product.getAllProducts();
        const userLogin = request.session.userLogged;

        response.render("user/profile", {title : "Editar Pérfil 😃", users : allUsers, products : allProducts, userLogin})
    },

    logout: function(request, response){
        request.session.destroy((err) => {
            if (err) {
              console.error('Error al cerrar sesión:', err);
              response.send('Error al cerrar sesión');
            } else {
              response.redirect('/');
            }
        });
    },

    logout2: function(request, response){
        response.send("Llego el logout")
    },

    changeUserImage: function(request, response){
        User.updateImg(request.params.id, request.file)
        response.redirect("/user/profile")
    }
};

module.exports = userController;