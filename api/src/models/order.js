'use strict'
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(36),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
      }
    },
    subTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    shipping: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: true
      }
    },
    email: {
      allowNull: false,
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
  order.associate = function(models) {
    order.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
    order.hasMany(models.order_item, {
      foreignKey: 'order_id'
    })
  }
  return order
}