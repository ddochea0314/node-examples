import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersCreationAttributes = Optional<UsersAttributes, UsersPk>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  // createdAt!: Date;
  // updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__Users__3213E83FB2DAF29C",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Users;
  }
}
