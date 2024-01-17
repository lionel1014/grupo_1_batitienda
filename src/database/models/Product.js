module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        product_category_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.belongsTo(models.ProductCategory,{
            as: 'product_categories',
            foreignKey: 'product_category_id'
        })
    }

    return Product
}