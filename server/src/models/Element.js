
module.exports = function (sequelize, DataTypes) {
  const Element = sequelize.define('Element', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    iconURL: DataTypes.STRING,
    userID: DataTypes.STRING
  });

  return Element
}
