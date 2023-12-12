const PATH = require('path');
const fs = require('fs');

const usersDB = require("../database/usuarios.json");
const usersFilePath = PATH.join(__dirname, '../database/usuarios.json');

const User = {

    saveUser: function(usersPreviousSave, userData = null){
        fs.writeFileSync(usersFilePath, JSON.stringify(usersPreviousSave, null, 2), 'utf-8');
    },

    getData: function(){
        return usersDB;
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        return this.getData().find( user => user.id === id);
    },

    findByField: function(field, text){
        const userFound =  this.getData().find( user => user[field] == text);
        return  userFound;
    },

    create: function(request){
        const { nombre, apellido, correo, usuario, contrasena } = request.body;
		
        let usersDB = this.getData();

		const newUser = {
			id: usersDB.length + 1,
			name: nombre,
			lastName: apellido,
            email: correo,
            password: contrasena,
            category: "admin",
            userName: usuario,
			image: `/images/img_profile/${request.file?.filename}`
		};
		usersDB.push(newUser);
        try{
            this.saveUser(usersDB, newUser)
        }catch(err){
            console.error(err);
        }
    },

    delete: function (id){
        const allUsers = this.getData();
        const finalUsers = allUsers.filter( user => user.id != id);

        try {
            this.saveUser(finalUsers)
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = User;