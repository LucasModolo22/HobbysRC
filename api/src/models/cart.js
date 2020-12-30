'use strict'
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
      }
    },
    firstName: {
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: true
      }
    },
    email: {
      unique: true,
      type: DataTypes.STRING(64),
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING(255),
      validate: {
        notEmpty: true
      }
    },
    address_number: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      }
    },
    province: {
      type: DataTypes.STRING(45),
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING(45),
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING(45),
      validate: {
        notEmpty: true
      }
    },
    cep: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {})
  cart.associate = function(models) {
    cart.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
    cart.hasMany(models.cart_item, {
      foreignKey: 'cart_id'
    })
  }
  return cart
}