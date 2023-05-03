import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";

class Cart extends Model{
  public id! : number;
  public name! : string;
}

Cart.init(
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
  },
  {
    sequelize,
    tableName: 'tags',
    timestamps: true,
  }
);


export default Cart;
