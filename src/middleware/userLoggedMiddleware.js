const User = require("../models/User");

function userLoggedMiddleware (request, response, next){
    response.locals.isLogged = false;
    let userInCookie = request.cookies?.userAcount;
    let userFromCookie = User.findByFields(userInCookie,'email', 'userName')
    
    if(request.cookies?.userName){
        response.locals.userName = request.cookies?.userName; 
    }

    if (userFromCookie) {
        response.locals.userLogged = userFromCookie;
        console.log("hay un usuario en cookie? 😒😒");
    }

    if (request?.session?.userLogged) {
        response.locals.isLogged = true;
        response.locals.userLogged =  request?.session?.userLogged;
    }
    
    next();
}
module.exports = userLoggedMiddleware;