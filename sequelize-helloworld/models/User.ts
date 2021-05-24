import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  Name: string;
  Email: string;
  Card: string;
}

export type UserCreationAttributes = UserAttributes;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  Name!: string;
  Email!: string;
  Card!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init({
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Card: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    schema: 'dbo',
    timestamps: false
  });
  return User;
  }
}
