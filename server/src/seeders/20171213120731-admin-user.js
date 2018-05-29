'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Idrees',
          email: 'idreeskun@kun.com',
          password: bcrypt.hashSync(process.env.SEED_SUPERADMIN, 10),
          role: 'superAdmin',
          isAdmin: true,
          isSuperAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Felix',
          email: 'felixeba@eba.com',
          password: bcrypt.hashSync(process.env.SEED_ADMIN, 10),
          role: 'Admin',
          isAdmin: true,
          isSuperAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Faith',
          email: 'faith.andela@andela.com',
          password: bcrypt.hashSync(process.env.SEED_USER, 10),
          role: 'User',
          isAdmin: false,
          isSuperAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', [{}])
};
