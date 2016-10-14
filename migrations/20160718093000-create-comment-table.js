'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Comments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AuthorId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      imageUrl: DataTypes.STRING, // for image-comment
      ParentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0 //for non-reply comment
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    })
  },

  down: function (queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Comments');
  }
};
