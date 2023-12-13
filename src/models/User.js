const PATH = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const usersDB = require("../database/usuarios.json");
const usersFilePath = PATH.join(__dirname, '../database/usuarios.json');

const User = {

    saveUser: function(usersPreviousSave, userData = null){
        try {
            fs.writeFileSync(usersFilePath, JSON.stringify(usersPreviousSave, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
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

    create: function(userForm, userImage){
        const { nombre, apellido, correo, usuario, contrasena } = userForm;
		
        let usersDB = this.getData();

		const newUser = {
			id: usersDB.length + 1,
			name: nombre,
			lastName: apellido,
            email: correo,
            password: bcrypt.hashSync(contrasena, 10),
            category: "admin",
            userName: usuario,
			image: userImage ? `${userImage.filename}` : '',
		};

		usersDB.push(newUser);

        try{
            this.saveUser(usersDB)
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