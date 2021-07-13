'use strict';

module.exports = (sequelize, DataTypes) => {
  var ViewerOf = sequelize.define(
    'ViewerOf',
    {
      userid: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        primaryKey: true
      },
      projectid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      }     
      }, {
        tableName: 'viewerof',
        timestamps: false,
    }
  );

  return ViewerOf;
};