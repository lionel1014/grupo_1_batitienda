const User = require("../models/User");
const Product = require("../models/ProductService")
const bcrypt = require("bcrypt")
const { validationResult} = require("express-validator")

const userController = {
    login: function(request, response){
        response.render("user/login", {title : "Login 😒"})
    },
    register: function(request, response){
        response.render("user/register", {title : "Registrar 😁"})
    },

    createProcess: function(request, response){
        let errors = validationResult(request);
        console.log(errors)
        if (errors.isEmpty()) {
            User.create(request.body, request.file)
            response.redirect("/user/register")
        } else {
            console.log(request.body)
            response.render("user/register", {title : "Registrar 😁", errors : errors.array(), old : request.body})
        }
        
    },

    loginProcess: function (request, response) {
        const {userAcount , contrasena , recordar_usuario} =  request.body;
        const userToLogin = User.findByFields(userAcount, 'email', 'userName');
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
        const isOkPassword = bcrypt.compareSync(contrasena, userToLogin.password);
        if (!isOkPassword)
            return response.render("user/login", {
                title: "Login 😒",
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas."
                    }
                }
            });

        if (recordar_usuario != undefined) {
            response.cookie("userAcount", userAcount);
            response.cookie("userName", userAcount);
        }else{
            response.clearCookie("userName");
        }
        
        // delete userToLogin.password;
        request.session.userLogged = userToLogin;
        response.redirect("/user/profile")
    },

    profile: async function ( request, response){
        const allUsers = User.getData();
        const allProducts = await Product.getAllProducts();
        const userLogin = request.session.userLogged;

        response.render("user/profile", {title : "Editar Pérfil 😃", users : allUsers, products : allProducts, userLogin})
    },

    logout: function(request, response){
        response.clearCookie("userAcount");
        request.session.destroy();
        response.redirect("/");
    },

    changeUserImage: function(request, response){
        User.updateImg(request.params.id, request.file)
        response.redirect("/user/profile")
    }
};

module.exports = userController;