const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Memory extends Model { }

Memory.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAudio: {
            type: DataTypes.BOOLEAN
        },
        mood: DataTypes.STRING
    },
    {
        sequelize
    }
);

module.exports = Memory;
