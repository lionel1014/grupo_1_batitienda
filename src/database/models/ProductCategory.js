module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        product_category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING(100)
        },
        sub_category: {
            type: dataTypes.STRING(100)
        }
    };
    let config = {
        tableName: 'product_categories',
        timestamps: false
    };
    const ProductCategory = sequelize.define(alias, cols, config)

    ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product,{
            as: 'product_categories',
            foreignKey: 'product_category_id'
        })
    }

    return ProductCategory
}