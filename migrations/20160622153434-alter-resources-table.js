'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.addColumn(
      'Resources',
      'regex',
      {
        type: DataTypes.STRING,
        after: "prettyName"
      }
    )
    .then(function() {
      // depending when indices are added, constraint names may differ
      return queryInterface.sequelize.query(
        'ALTER TABLE "Resources" DROP CONSTRAINT IF EXISTS "Resources_name_key";' +
        'ALTER TABLE "Resources" DROP CONSTRAINT IF EXISTS "name_unique_idx";'
      )
      .then(function() {
        return queryInterface.removeIndex('Resources', 'Resources_name_key');
      })
      .then(function() {
        return queryInterface.removeIndex('Resources', 'name_unique_idx');
      });
    })
    .then(function() {
      // depending when indices are added, constraint names may differ
      return queryInterface.sequelize.query(
        'ALTER TABLE "Resources" DROP CONSTRAINT IF EXISTS "Resources_prettyName_key";' +
        'ALTER TABLE "Resources" DROP CONSTRAINT IF EXISTS "prettyName_unique_idx";'
      )
      .then(function() {
        return queryInterface.removeIndex('Resources', 'Resources_prettyName_key');
      })
      .then(function() {
        return queryInterface.removeIndex('Resources', 'prettyName_unique_idx');
      });
    });
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.changeColumn('Resources',
      'prettyName',
      {
        type: DataTypes.STRING,
        //unique: true
      }
    )
    .then(function() {
      return queryInterface.changeColumn('Resources',
        'name',
        {
          type: DataTypes.STRING,
          //unique: true
        }
      )
    })
    .then(function() {
      return queryInterface.removeColumn('Resources', 'regex')
    });
  }
};
