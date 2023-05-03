import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";
import bcrypt from 'bcrypt';

class User extends Model{
  public id! : number;
  public name! : string;
  public email! : string;
  public password! : string;
  public role! : string;
  public token! : string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
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
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role : {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    token : {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      },
    },
  }
);

export default User;
