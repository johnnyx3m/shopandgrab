'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "Roles_name_key";' +
      'ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "name_unique_idx";'
    )
    .then(function() {
      return queryInterface.removeIndex('Roles', 'Roles_name_key');
    })
    .then(function() {
      return queryInterface.removeIndex('Roles', 'name_unique_idx');
    })
    .then(function() {
      // depending when indices are added, constraint names may differ
      return queryInterface.sequelize.query(
        'ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "Roles_prettyName_key";' +
        'ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "prettyName_unique_idx";'
      )
      .then(function() {
        return queryInterface.removeIndex('Roles', 'Roles_prettyName_key');
      })
      .then(function() {
        return queryInterface.removeIndex('Roles', 'prettyName_unique_idx');
      });
    });
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.changeColumn('Roles',
      'prettyName',
      {
        type: DataTypes.STRING,
        //unique: true
      }
    )
    .then(function() {
      return queryInterface.changeColumn('Roles',
        'name',
        {
          type: DataTypes.STRING,
          //unique: true
        }
      )
    });
  }
};
