'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];
// const db : any = {};

let sequelize : Sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);


// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, typeof(Sequelize));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


export default sequelize;