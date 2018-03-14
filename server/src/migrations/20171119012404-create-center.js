module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Free'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => {
    return queryInterface.dropTable('Centers');
  }
};
