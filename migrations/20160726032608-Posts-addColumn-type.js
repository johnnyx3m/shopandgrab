'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Posts',
      'type',
      DataTypes.STRING
    )
    .then(() => {
      return queryInterface.removeColumn('Posts', 'imageUrl')
    })
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Posts', 'type')
  }
};
