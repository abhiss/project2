"use strict";
exports.__esModule = true;
require('dotenv').config();
var Sequelize = require('sequelize');
var sequelize = new Sequelize({
    username: "c8cswvixj0mjb280",
    password: "d2pf8mudmadx8v67",
    database: "ren7kbjw9m3kw1qg",
    host: "u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
});
module.exports = sequelize;
