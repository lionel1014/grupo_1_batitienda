function userLoggedMiddleware (request, response, next){
    if (request?.session?.userLogged) {
        response.locals.userLogged =  request?.session?.userLogged;
    }
    next();
}
module.exports = userLoggedMiddleware;