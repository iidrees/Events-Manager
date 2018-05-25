module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        isDate: true,
        unique: true
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        isDate: true,
        unique: true
      },
      center: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isCancelled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
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
        }
      },
      centerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId'
        }
      }
    }),
  down: (queryInterface) /* , Sequelize */ => queryInterface.dropTable('Events')
};
