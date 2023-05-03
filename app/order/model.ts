import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";

class Order extends Model{
    public id! : number;
    public qty! : number;
    public status! : string;
    public delivery_fee! : number;
    public delivery_address! : number;
}

Order.init(
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


export default Order;
