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
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
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
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id',
          as: 'eventId'
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) => {
    return queryInterface.dropTable('Centers');
  }
};