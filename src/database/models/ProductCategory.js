module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        product_category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        sub_category: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'product_categories',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
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