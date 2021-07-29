'use strict';

module.exports = (sequelize, DataTypes) => {
  var Viewer = sequelize.define(
    'Viewer',
    {
      userid: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        primaryKey: true
      },
      promotedate: {
        type: DataTypes.DATE
      },
      }, {
        tableName: 'viewers',
        timestamps: false,
    }
  );

  Viewer.associate = function (models) {
    models.Viewer.hasMany(models.ViewerOf, {foreignKey: 'userid'})
  }
  return Viewer;
};
