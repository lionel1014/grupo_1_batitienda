module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(200)
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
        },
        stock: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(500)
        },
        image: {
            type: dataTypes.STRING(255)
        },
        product_category_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.belongsTo(models.ProductCategory,{
            as: 'product_category',
            foreignKey: 'product_category_id'
        })
    }


    return Product
}