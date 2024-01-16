module.exports = (sequelize, dataTypes) => {
    let alias = 'PurchaseOrder';
    let cols = {
        purchase_order_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: dataTypes.DECIMAL(10,2),
        },
        order_state: {
            type: dataTypes.STRING(100)
        },
        create_date: {
            type: dataTypes.DATE
        },
        customer_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'purchase_orders',
        timestamps: false
    };
    const PurchaseOrder = sequelize.define(alias, cols, config)

    PurchaseOrder.associate = function(models){
        PurchaseOrder.belongsTo(models.User,{
            as: 'customer',
            foreignKey: 'customer_id'
        })
    }


    return PurchaseOrder
}