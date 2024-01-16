const { Op } = require('sequelize')
let db = require("../database/models")

async function userLoggedMiddleware (request, response, next){
    response.locals.isLogged = false;
    let userInCookie = request.cookies?.userAcount;
    console.log(userInCookie)
    let userFromCookie = undefined
    if(userInCookie){
        userFromCookie = await db.User.findOne({ //reemplazar por la db
            where: {
                [Op.or]: [
                    { email: userInCookie },
                    { user_name: userInCookie },
                ],
            },
        })
    }

    if(request.cookies?.userName){
        response.locals.userName = request.cookies?.userName; 
    }

    if (userFromCookie)
        response.locals.userLogged = userFromCookie;

    if (request?.session?.userLogged) {
        response.locals.isLogged = true;
        response.locals.userLogged =  request?.session?.userLogged;
    }
    
    next();
}
module.exports = userLoggedMiddleware;