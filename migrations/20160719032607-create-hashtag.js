'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('Hashtags', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      hashtag: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    })
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('Hashtags');
  }
};
