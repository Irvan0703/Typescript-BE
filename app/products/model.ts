import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";

class Product extends Model{
  public id! : number;
  public name! : string;
  public description! : string;
  public price! : number;
  public stock! : number;
  public tags! : [];
  public category! : [];
  public image_url! : string;
}

Product.init(
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price:{
      type : DataTypes.NUMBER,
      allowNull: false,
    },
    stock:{
      type : DataTypes.NUMBER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
