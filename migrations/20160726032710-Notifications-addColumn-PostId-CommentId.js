'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Notifications',
      'PostId',
      DataTypes.INTEGER
    )
    .then(() => {
      return queryInterface.addColumn(
        'Notifications',
        'CommentId',
        DataTypes.INTEGER
      )
    })
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Notifications', 'PostId')
    .then(() => {
      return queryInterface.removeColumn('Notifications', 'CommentId')
    })
  }
};
