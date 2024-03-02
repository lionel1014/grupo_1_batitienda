const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")
const { validationResult} = require("express-validator")

const { Op } = require('sequelize')
let db = require("../database/models")

const userController = {
    login: function(request, response){
        response.render("user/login", {title : "Login 😒"})
    },
    register: function(request, response){
        response.render("user/register", {title : "Registrar 😁"})
    },

    createProcess: function(request, response){
        let errors = validationResult(request);
        if (errors.isEmpty()) {
            db.User.create({
                name: request.body.nombre,
                last_name: request.body.apellido,
                email: request.body.correo,
                password: bcrypt.hashSync(request.body.contrasena, 10),
                image: request.file ? `${request.file.filename}` : '',
                user_name: request.body.usuario,
                category: 2
            })

            response.redirect("/user/register")
        } else {
            console.log(errors)
            response.render("user/register", {title : "Registrar 😁", errors : errors.array(), old : request.body})
        }
        
    },

    loginProcess: function (request, response) {
        const { userAcount, contrasena, recordar_usuario } = request.body;
    
        db.User.findOne({
            where: {
                [Op.or]: [
                    { email: userAcount },
                    { user_name: userAcount },
                ],
            },
        })
            .then((userToLogin) => {
                if (!userToLogin) {
                    return response.render("user/login", {
                        title: "Login 😒",
                        errors: {
                            email: {
                                msg: "No se encontró ese email registrado"
                            }
                        }
                    });
                }
    
                const isOkPassword = bcrypt.compareSync(contrasena, userToLogin.password);
                if (!isOkPassword) {
                    return response.render("user/login", {
                        title: "Login 😒",
                        errors: {
                            email: {
                                msg: "Las credenciales son inválidas."
                            }
                        }
                    });
                }
    
                if (recordar_usuario != undefined) {
                    response.cookie("userAcount", userAcount);
                    response.cookie("userName", userAcount);
                } else {
                    response.clearCookie("userName");
                }
    
                // delete userToLogin.password;
                request.session.userLogged = userToLogin;
                response.redirect("/user/profile");
            })
            .catch((error) => {
                console.error(error);
                response.status(500).send('Error en el servidor');
            });
    },
    
    profile: function ( request, response){
        const userLogin = request.session.userLogged;
        const usersPromise = db.User.findAll({
            where: {
                user_id: {
                    [Op.ne]: userLogin.user_id 
                }
            }
        });
        const productsPromise = db.Product.findAll();

        Promise.all([usersPromise, productsPromise])
             .then(function ([users, products]) {
                response.render("user/profile", { title: "Editar Pérfil 😃", users, products, userLogin });
            })
            .catch(function (error) {
                console.error(error);
                response.status(500).send('Error en el servidor');
            });
    },
  
    editProfile: function (request, response){
        db.User.update({
                name: request.body.nombre,
                last_name: request.body.apellido,
                email: request.body.correo,
                password: bcrypt.hashSync(request.body.contrasena, 10),
                image: request.session.userLogged.image,
                user_name: request.body.usuario,
                category: 2
        },{
            where: {
            user_id: request.session.userLogged.user_id
            }
        })

        .then(async usuarioEditado => {
            const usuarioLogueado = await db.User.findByPk(request.session.userLogged.user_id)
            request.session.userLogged = usuarioLogueado;
            response.redirect("/user/profile")
        })

    },

    logout: function(request, response){
        response.clearCookie("userAcount");
        request.session.destroy();
        response.redirect("/");
    },

    changeUserImage: async (request, response) => {
        try {
          const userId = request.session.userLogged.user_id;
      
          // Obtener la información actual del usuario
          const currentUser = await db.User.findByPk(userId);
      
          // Actualizar la imagen del usuario en la base de datos
          const [rowEdited] = await db.User.update(
            {
              image: request.file ? request.file.filename : null,
            },
            {
              where: { user_id: userId },
            }
          );

          // Verificar si hay una nueva imagen y eliminar la imagen anterior
          if (request.file && currentUser.image && rowEdited > 0) {
            const imagePath = path.join(__dirname, `../public/images/img_profile/${currentUser.image}`);
            fs.unlinkSync(imagePath);
          }
      
          response.redirect('/user/profile');
        } catch (error) {
          console.error(error);
          response.status(500).send('Error en el servidor');
        }
    },

    deleteSelectedUser: async function (request, response) {
        try {
          const { userIdToDelete } = request.body;
    
          // Verificar si se proporcionó un ID de usuario para eliminar
          if (!userIdToDelete) {
            return response.status(400).send('ID de usuario no proporcionado');
          }
    
          // Obtener la información del usuario a eliminar
          const userToDelete = await db.User.findByPk(userIdToDelete);
    
          // Verificar si el usuario existe
          if (!userToDelete) {
            return response.status(404).send('Usuario no encontrado');
          }
    
          // Eliminar la imagen de perfil del usuario
          if (userToDelete.image) {
            const imagePath = path.join(__dirname, `../public/images/img_profile/${userToDelete.image}`);
            fs.unlinkSync(imagePath);
          }
    
          // Eliminar al usuario de la base de datos
          await db.User.destroy({
            where: { user_id: userIdToDelete },
          });
    
        //   return response.status(200).send('');
        response.redirect('/user/profile');
        } catch (error) {
          console.error(error);
          response.status(500).send('Error en el servidor');
        }
    },

    list: (req, res) => {
        db.User
            .findAll()
            .then(users => {
                return res.status(200).json({
                    total: users.length,
                    data: users,
                    status: 200
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    show: (req, res) => {
        db.User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: 'User not found',
                        status: 404
                    });
                }
                return res.status(200).json({
                    data: user,
                    status: 200
                });
            })
            .catch(error => {
                console.error('Error finding user:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    store: (req, res) => {
        db.User
            .create(req.body)
            .then(user => {
                return res.status(200).json({
                    data: user,
                    status: 200,
                    created: "ok"
                });
            })
            .catch(error => {
                console.error('Error creating user:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    update: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: 'User not found',
                        status: 404
                    });
                }
                user.update(req.body)
                    .then(updatedUser => {
                        return res.status(200).json({
                            data: updatedUser,
                            status: 200,
                            message: 'User updated successfully'
                        });
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                        return res.status(500).json({
                            error: 'Internal Server Error',
                            status: 500
                        });
                    });
            })
            .catch(error => {
                console.error('Error finding user:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
        
    delete: (req, res) => {
        db.User
            .destroy({
                where: {
                    user_id: req.params.id
                }
            })
            .then(response => {
                return res.json(response);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    },
    
    search: (req, res) => {
        db.User
            .findAll({
                where: {
                    user_name: {[Op.like]: "%" + req.query.keyword + "%"}
                }
            })
            .then(users => {
                if (users.length > 0) {
                    return res.status(200).json({
                        total: users.length,
                        data: users,
                        status: 200
                    });
                }
                return res.status(200).json("No se encontro ningun usuario")
            })
            .catch(error => {
                console.error('Error searching users:', error);
                return res.status(500).json({
                    error: 'Internal Server Error',
                    status: 500
                });
            });
    }    

};

module.exports = userController;