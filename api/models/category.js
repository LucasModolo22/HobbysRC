'use strict'
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    metaTitle: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    slug: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {})
  category.associate = function(models) {
    category.belongsToMany(models.product, {
      through: 'category_product',
      as: 'products',
      foreignKey: 'category_id'
    })
  }
  return category
}