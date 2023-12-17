const User = require("../models/User");

function updateCookieMiddleware (request, response, next){
    console.log("se actualizo el usuario", request.params.id,  request.file)
    // const user = User.findByPk(request.params.id);

    if (request?.session?.userLogged) {
        response.locals.userLogged.image =  request.file.filename;
    }

    next();
};

module.exports = updateCookieMiddleware;