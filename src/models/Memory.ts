export { }

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Memory extends Model { }

Memory.init(
    {
        body: DataTypes.STRING
    },
    {
        sequelize
    }
);

module.exports = Memory;
