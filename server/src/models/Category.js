
module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    userID: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      set: function(value) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('active', value);
      }
    }
  });

  return Category
}
