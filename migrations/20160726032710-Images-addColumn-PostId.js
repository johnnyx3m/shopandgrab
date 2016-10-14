'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Images',
      'PostId',
      {
        type: DataTypes.INTEGER,
        after: "filetype"
      }
    )
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Images', 'PostId')
  }
};
