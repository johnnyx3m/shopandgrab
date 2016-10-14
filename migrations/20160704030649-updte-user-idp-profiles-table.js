'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserIdpProfiles', 'pictureUrl', {
      type: Sequelize.STRING
    });
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('UserIdpProfiles', 'pictureUrl');
  }
};
