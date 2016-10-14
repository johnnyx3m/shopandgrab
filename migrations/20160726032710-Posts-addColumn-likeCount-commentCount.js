'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Posts',
      'likeCount',
      {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Posts',
        'commentCount',
        {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      )
    })
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Posts', 'likeCount')
    .then(() => {
      return queryInterface.removeColumn('Posts', 'commentCount')
    })
  }
};
