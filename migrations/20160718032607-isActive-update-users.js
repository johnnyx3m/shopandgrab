'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Users',
      'isActive',
      {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users', 'isActive')
  }
};
