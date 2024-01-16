function updateCookieMiddleware (request, response, next){

    if (request?.session?.userLogged) {
        response.locals.userLogged.image =  request.file.filename;
    }

    next();
};

module.exports = updateCookieMiddleware;