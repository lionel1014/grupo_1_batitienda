function guessMiddleware (request, response, next){
    if(request.session.userLogged){
        return response.redirect('/'); //redireccionar a userProfile cuando este hecho 1h.16m
    };
    next();
};

module.exports = guessMiddleware;