'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
      name: 'Idrees',
      email: 'idreeskun@kun.com',
      password: bcrypt.hashSync('password', 10),
      role: 'Super-Admin',
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', [{
      name: 'Idrees'
    }])
};
