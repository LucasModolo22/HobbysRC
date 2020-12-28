'use strict'
module.exports = (sequelize, DataTypes) => {
  const product_review = sequelize.define('product_review', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
  }, {})
  product_review.associate = function(models) {
    product_review.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
    product_review.belongsTo(models.product, {
      foreignKey: 'product_id'
    })
  }
  return product_review
}