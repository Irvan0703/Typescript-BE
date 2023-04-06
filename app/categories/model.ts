import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";
import Product from "../products/model";

class Category extends Model{
  public id! : number;
  public name! : string;
}

Category.init(
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
    tableName: 'categories',
    timestamps: true,
  }
);

Category.belongsToMany(Product, { through: 'category' });
Product.belongsToMany(Product, { through: 'category' });

export default Category;
