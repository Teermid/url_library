
module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    userID: DataTypes.STRING
  });

  return Category
}
