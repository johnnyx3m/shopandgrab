'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Users',
      'deviceId',
      DataTypes.STRING
    )
    .then(() => {
      return queryInterface.addColumn(
        'Users',
        'endpointArn',
        DataTypes.STRING
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Users',
        'device',
        DataTypes.STRING
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Users',
        'notificationCount',
        {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      )
    })
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users', 'deviceId')
    .then(() => {
      return queryInterface.removeColumn('Users', 'endpointArn')
    })
    .then(() => {
      return queryInterface.removeColumn('Users', 'device')
    })
    .then(() => {
      return queryInterface.removeColumn('Users', 'notificationCount')
    })
  }
};
