'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sponsorof', {
      userid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      projectid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });

    await queryInterface.addConstraint('sponsorof', {
      type: 'primary key',
      name: 'primary_userid_projectid',
      fields: ['userid', 'projectid'],
    });

    await queryInterface.createTable('viewerof', {
      userid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      projectid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });

    await queryInterface.addConstraint('viewerof', {
      type: 'primary key',
      name: 'vof_primary_userid_projectid',
      fields: ['userid', 'projectid'],
    });

    await queryInterface.createTable('favouriteprojects', {
      userid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      projectid: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
    await queryInterface.addConstraint('favouriteprojects', {
      type: 'primary key',
      name: 'fp_primary_userid_projectid',
      fields: ['userid', 'projectid'],
    });

    await queryInterface.createTable('viewers', {
      userid: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      promotedate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    await queryInterface.createTable('votedfor', {
      userid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      projectid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stage: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      promotedate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    await queryInterface.addConstraint('votedfor', {
      type: 'primary key',
      name: 'vf_primary_userid_projectid',
      fields: ['userid', 'projectid', 'stage'],
    });

    await queryInterface.addConstraint('votedfor', {
      type: 'foreign key',
      name: 'vfkey_ownerid',
      fields: ['userid', 'projectid'],
      references: { //Required field
        table: 'viewerof',
        fields: ['userid', 'projectid']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('votedfor', 'vfkey_ownerid');
    await queryInterface.dropTable('votedfor');
    await queryInterface.dropTable('sponsorof');
    await queryInterface.dropTable('favouriteprojects');
    await queryInterface.dropTable('viewers');
    await queryInterface.dropTable('viewerof');
  }
};