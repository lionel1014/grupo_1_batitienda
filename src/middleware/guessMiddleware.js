function guessMiddleware (request, response, next){
    if(request.session.userLogged){
        return response.redirect('/user/profile');
    };
    next();
};

module.exports = guessMiddleware;