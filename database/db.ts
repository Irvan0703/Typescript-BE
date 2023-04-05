const {Sequelize }= require('sequelize');

export const sequelize= new Sequelize ({
    database: 'flip',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect:'mysql'
  });
