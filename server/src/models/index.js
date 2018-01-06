const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../config/config');
const db = {};


const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

fs.readdirSync(__dirname).filter((file) =>
    file !== 'index.js'

  ).forEach((file) =>{
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model
    });

//Constant sequelize
db.sequelize = sequelize;
//Objecte del modul Sequelize
db.Sequelize = Sequelize;

db.Op = Op;

module.exports = db;
