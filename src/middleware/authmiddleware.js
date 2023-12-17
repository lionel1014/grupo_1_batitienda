function authMiddleware (request, response, next){
    if(!request.session.userLogged){
        return response.redirect('/');
    };
    next();
};

module.exports = authMiddleware;