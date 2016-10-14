'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn('Users','userType',DataTypes.STRING);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users','userType');
  }
};
