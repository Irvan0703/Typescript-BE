import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";
import Tag from "../tags/model";

class Product extends Model{
  public id! : number;
  public name! : string;
  public description! : string;
  public price! : number;
  public stock! : number;
  public image_url! : string;
  public category! : string;

  public getTag!: () => Promise<Tag[]>;
  public addTag!: (tag : Tag | null) => Promise<void>
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
      type : DataTypes.DOUBLE(20,2),
      allowNull: false,
    },
    stock:{
      type : DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

Product.belongsToMany(Tag, { through: 'ProductAtrribute' });
Tag.belongsToMany(Product, { through: 'ProductAtrribute' });

export default Product;
