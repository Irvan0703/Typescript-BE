"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const { Sequelize } = require('sequelize-typescript');
exports.sequelize = new Sequelize({
    database: 'flip',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: true,
        freezeTableName: true
    }
});
