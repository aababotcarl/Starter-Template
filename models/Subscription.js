/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Subscription', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'Subscription'
  });
};
