'use strict'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(36),
      allowNull: false,
      validate: {
        notEmpty: true
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
    mobile: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(11),
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
    password: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    admin: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.BOOLEAN
    },
    cpf: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(11),
      validate: {
        notEmpty: true
      }
    },
    registeredAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    lastLogin: {
      type: DataTypes.DATE
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
  user.associate = function(models) {
    user.hasOne(models.cart, {
      foreignKey: 'user_id'
    })
    user.hasMany(models.order, {
      foreignKey: 'user_id'
    })
    user.hasMany(models.product_review, {
      foreignKey: 'user_id'
    })
  }
  return user
}