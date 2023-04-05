"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
const db_1 = require("../../database/db");
/*
export const store = (product : Product, callback : Function) => {
    const queryString = "INSERT INTO products (id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)"

    sequelize.query(
    queryString,
    [product.id, product.name, product.description,product.price, product.stock],
    (err:any, result:any) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
}
*/
const view = (callback) => {
    const queryString = `SELECT * FROM products `;
    db_1.sequelize.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        callback(null, rows);
    });
};
exports.view = view;
