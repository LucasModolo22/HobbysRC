'use strict'
module.exports = (sequelize, DataTypes) => {
  const cart_item = sequelize.define('cart_item', {
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
  cart_item.associate = function(models) {
    cart_item.belongsTo(models.cart, {
      foreignKey: 'cart_id'
    })
    cart_item.belongsTo(models.product, {
      foreignKey: 'product_id'
    })
  }
  return cart_item
}