const userController = {
    login: function(request, response){
        response.render("user/login", {title : "Login 😒"})
    },
    register: function(request, response){
        response.render("user/register", {title : "Registrar 😁"})
    },
    editPerfil: function(request, response){
        response.render("user/editPerfil", {title : "Editar Pérfil 😃"})
    }
}

module.exports = userController;