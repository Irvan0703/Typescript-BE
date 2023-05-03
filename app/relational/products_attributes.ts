import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";
import Product from "../products/model";
import Tag from "../tags/model";

class ProductAtrribute extends Model{
  public id! : number;
  public ProductId! : number;
  public TagId! : number;
}

ProductAtrribute.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model: Product,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    TagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Tag,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
  },
  {
    sequelize,
    tableName: 'ProductAtrribute',
    timestamps: true,
  }
);


export default ProductAtrribute;
