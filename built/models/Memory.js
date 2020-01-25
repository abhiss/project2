"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _a = require('sequelize'), Sequelize = _a.Sequelize, Model = _a.Model, DataTypes = _a.DataTypes;
var sequelize = require('../config/config');
var Memory = (function (_super) {
    __extends(Memory, _super);
    function Memory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Memory;
}(Model));
Memory.init({
    body: DataTypes.STRING
}, {
    sequelize: sequelize
});
module.exports = Memory;
