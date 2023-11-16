const userController = {
    login: function(request, response){
        response.render("user/login")
    },
    register: function(request, response){
        response.render("user/register")
    }
}

module.exports = userController;