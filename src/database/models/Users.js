module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        last_name: {
            type: dataTypes.STRING(100)
        },
        email: {
            type: dataTypes.STRING(100)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        category: {
            type: dataTypes.INTEGER,
            unsigned: true
        },
        image: {
            type: dataTypes.STRING(255)
        },
        user_name: {
            type: dataTypes.STRING(100)
        },
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.hasMany(models.PurchaseOrder,{
            as: 'purchases',
            foreignKey: 'customer_id'
        })
    }


    return User
}