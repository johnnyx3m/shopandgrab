'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('AppViewConfigs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      },
      AppConfigurationId: DataTypes.INTEGER,
      view: DataTypes.STRING,
      items: DataTypes.INTEGER,
      activeFields: DataTypes.ARRAY(DataTypes.STRING),
      facebookToken: DataTypes.STRING,
      googleToken: DataTypes.STRING
    })
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('AppViewConfigs');
  }
};
