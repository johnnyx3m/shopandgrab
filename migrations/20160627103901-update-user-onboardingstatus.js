'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn('Users','status',DataTypes.STRING)
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users','status')
  }
};
