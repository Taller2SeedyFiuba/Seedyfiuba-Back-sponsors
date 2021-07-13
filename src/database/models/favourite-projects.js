'use strict';

module.exports = (sequelize, DataTypes) => {
  const FavouriteProjects = sequelize.define(
    'FavouriteProjects',
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
        tableName: 'favouriteprojects',
        timestamps: false,
    }
  );

  return FavouriteProjects;
};