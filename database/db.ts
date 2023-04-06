
const {Sequelize }= require('sequelize-typescript');

export const sequelize= new Sequelize ({
    database: 'flip',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect:'mysql',
    define: {
      timestamps: true,
      freezeTableName: true
    }
  });
