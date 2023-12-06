const userController = {
    login: function(request, response){
        response.render("user/login", {title : "Login 😒"})
    },
    register: function(request, response){
        response.render("user/register", {title : "Registrar 😁"})
    }
}

module.exports = userController;