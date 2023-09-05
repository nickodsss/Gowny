'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Dress, { foreignKey: 'StoreId' })
    }
  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Store Name cannot be empty'
        },
        notEmpty: {
          msg: 'Store Name cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Store Address cannot be empty'
        },
        notEmpty: {
          msg: 'Store Address cannot be empty'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.STRING
    },
    long: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  Store.beforeCreate((stores) => {
    stores.status = 'Active'
  })
  return Store;
};