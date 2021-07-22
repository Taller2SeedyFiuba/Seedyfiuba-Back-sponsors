'use strict';

module.exports = (sequelize, DataTypes) => {
  var VotedFor = sequelize.define(
    'VotedFor',
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
      },
      stage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      }
      }, {
        tableName: 'votedfor',
        timestamps: false,
    }
  );

  return VotedFor;
};
