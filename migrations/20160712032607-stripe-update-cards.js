'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Cards',
      'creditCardId',
      DataTypes.STRING
    )
    .then(() => {
      return queryInterface.addColumn(
        'Cards',
        'creditCardExpirationYear',
        DataTypes.STRING
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Cards',
        'creditCardExpirationMonth',
        DataTypes.STRING
      )
    })
    .then(() => {
      return queryInterface.removeColumn('Cards', 'creditCardExpiration')
    });
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Cards', 'creditCardId')
    .then(() => {
      return queryInterface.removeColumn('Cards', 'creditCardExpirationYear')
    })
    .then(() => {
      return queryInterface.removeColumn('Cards', 'creditCardExpirationMonth')
    })
  }
};
