/*const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const config = require('../config/config')
const db = {};


const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

  Object.keys(db).forEach(function(modelName) {
   if (db[modelName].options.hasOwnProperty('associate')) {
     db[modelName].options.associate(db)
   }
 })

 db.sequelize = sequelize
 db.Sequelize = Sequelize


module.exports = db;*/

// User.hasMany(Category)
// Category.belongsToMany(Element, {as: 'elements', through: 'elementCategories'})
// Element.belongsToMany(Category, {as: 'categories', through: 'elementCategories'})
