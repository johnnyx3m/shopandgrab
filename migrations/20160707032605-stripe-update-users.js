'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Users',
      'stripeId',
      DataTypes.STRING
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users', 'stripeId');
  }
};
