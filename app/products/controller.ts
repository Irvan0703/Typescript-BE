import Product  from "./model";
import { sequelize } from '../../database/db';
import { OkPacket,RowDataPacket  } from "mysql2";
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
export const view = (callback: Function) => {
  const queryString = `SELECT * FROM products `

    sequelize.query(queryString, (err:any, result:any) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;

    callback(null, rows);
  });
}
