'use strict';

module.exports = (sequelize, DataTypes) => {
  var SponsorOf = sequelize.define(
    'SponsorOf',
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
        tableName: 'sponsorof',
        timestamps: false,
    }
  );

  return SponsorOf;
};