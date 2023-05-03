"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const model_1 = __importDefault(require("../tags/model"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE(20, 2),
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'products',
    timestamps: true,
});
Product.belongsToMany(model_1.default, { through: 'ProductAtrribute' });
model_1.default.belongsToMany(Product, { through: 'ProductAtrribute' });
exports.default = Product;
