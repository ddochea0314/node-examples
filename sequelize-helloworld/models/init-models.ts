import type { Sequelize, Model } from "sequelize";
import { User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";

export {
  User,
};

export type {
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);


  return {
    User: User,
  };
}
