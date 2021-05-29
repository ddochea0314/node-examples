import type { Sequelize, Model } from "sequelize";
import { Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export {
  Users,
};

export type {
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Users.initModel(sequelize);


  return {
    Users: Users,
  };
}
