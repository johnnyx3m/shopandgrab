'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn('Actions',
      'httpVerb',
      {
        type: DataTypes.STRING(32)
      }
    )
    .then(function() {
      return queryInterface.sequelize.query(
        'ALTER TABLE "Actions" DROP CONSTRAINT name_unique_idx;')
      .then(function() {
        return queryInterface.removeIndex('Actions', 'name_unique_idx');
      });
    });
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.removeIndex('Actions', 'name_httpverb_unique_idx')
    .then(function() {
      return queryInterface.changeColumn('Actions',
        'name',
        {
          type: DataTypes.STRING(32),
          unique: true
        }
      )
    })
    .then(function() {
      return queryInterface.removeColumn('Actions', 'httpVerb');
    });
  }
};
