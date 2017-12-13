'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
      name: 'Idrees',
      email: 'idreeskun@kun.com',
      password: bcrypt.hashSync('password', 10),
      role: 'superAdmin',
      createdAt: new Date(),
      updateAt: new Date()
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', [{
      name: 'Idrees'
    }])
};
