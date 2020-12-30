'use strict'
module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define('order_item', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: true,
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
      }
    },
  }, {})
  order_item.associate = function(models) {
    order_item.belongsTo(models.order, {
      foreignKey: 'order_id'
    })
    order_item.belongsTo(models.product, {
      foreignKey: 'product_id'
    })
  }
  return order_item
}