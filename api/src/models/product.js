'use strict'
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(36),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    metaTitle: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
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
    publishedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    images: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('value'));
      },
      set: function (value) {
        this.setDataValue('value', JSON.stringify(value));
      },
    }
  }, {})
  product.associate = function(models) {
    product.hasOne(models.order_item, {
      foreignKey: 'product_id'
    })
    product.hasMany(models.product_review, {
      foreignKey: 'product_id'
    })
    product.hasMany(models.cart_item, {
      foreignKey: 'product_id'
    })
    product.belongsToMany(models.category, {
      through: 'category_product',
      as: 'categories',
      foreignKey: 'product_id'
    })
  }
  return product
}