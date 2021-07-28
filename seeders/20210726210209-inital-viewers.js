'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    return queryInterface.bulkInsert('viewers', [{
      userid: 'C5Jeg8M5HKaIKOqXt5bZX7IdWFk2'
    }, {
      userid: 'pvs2jwbOFiZN4WOtQBYmr5LzLU53'
    }, {
      userid: 'sSbHAjsWp8X3mNJ6rd1JtQB4vtU2'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('viewers',
      { userid: {[Op.in]: ['C5Jeg8M5HKaIKOqXt5bZX7IdWFk2', 'pvs2jwbOFiZN4WOtQBYmr5LzLU53', 'sSbHAjsWp8X3mNJ6rd1JtQB4vtU2']} }
    );
  }
};



