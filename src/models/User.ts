export { }
import user from "../routes/user";

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class User extends Model { }
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize
  }
);

module.exports = User;
