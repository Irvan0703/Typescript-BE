import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";

class User extends Model{
  public id! : number;
  public name! : string;
  public email! : string;
  public password! : string;
  public role! : string;
  public token! : string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    role : {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    token : {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
