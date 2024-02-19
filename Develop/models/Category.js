const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}


//category model for db
Category.init(
  {
    id: {
      onDelete: 'CASCADE',
      // onDelete: 'Set Null',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      onDelete: 'CASCADE',
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
  
  sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  });

module.exports = Category;
