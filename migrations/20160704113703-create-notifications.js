'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('Notifications', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      userNotificationId: DataTypes.INTEGER,
      isRead: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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
    })
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('Notifications');
  }
};
