'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dress.hasMany(models.Favorite, { foreignKey: 'DressId' })
      Dress.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'DressId',
        otherKey: 'UserId'
      })

      Dress.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Dress.belongsTo(models.Store, { foreignKey: 'StoreId' })

      Dress.hasMany(models.Image, { foreignKey: 'DressId' })
    }
  }
  Dress.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dress Name cannot be empty'
        },
        notEmpty: {
          msg: 'Dress Name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dress Description cannot be empty'
        },
        notEmpty: {
          msg: 'Dress Description cannot be empty'
        }
      }
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dress Grade cannot be empty'
        },
        notEmpty: {
          msg: 'Dress Grade cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dress Price cannot be empty'
        },
        notEmpty: {
          msg: 'Dress Price cannot be empty'
        },
        isInt: {
          msg: 'Price input must be integer'
        }
      }
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dress Main Image cannot be empty'
        },
        notEmpty: {
          msg: 'Dress Main Image cannot be empty'
        }
      }
    },
    CategoryId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dress',
  });
  return Dress;
};