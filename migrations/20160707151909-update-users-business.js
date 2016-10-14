'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Users',
      'businessName',
      DataTypes.STRING
    )
    .then(() => {
      return queryInterface.addColumn(
        'Users',
        'contactName',
        DataTypes.STRING
      )
    })
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users', 'businessName')
    .then(() => {
      return queryInterface.removeColumn('Users', 'contactName')
    })
  }
};
