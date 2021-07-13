'use strict';

module.exports = (sequelize, DataTypes) => {
  const type_enum = ['software', 'electronics', 'art'];
  const Preferences = sequelize.define(
    'Preferences',
    {
      userid: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: DataTypes.ENUM(...type_enum),
        allowNull: false,
        primaryKey: true,
      }     
      }, {
        tableName: 'preferences',
        timestamps: false,
    }
  );

  return Preferences;
};