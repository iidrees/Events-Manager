'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Centers',
      [
        {
          description: 'THis is a center from a superAdmin user',
          name: 'Ketu-ojota-mall',
          status: 'Free',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg',
          owner: 'SuperAdmin-baba',
          capacity: 3000,
          location: 'Ketu',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: 'WE taking over, one city at a time',
          name: 'Maryland Mall',
          status: 'Free',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg',
          owner: 'Me-kun-mi',
          capacity: 3000,
          location: 'Maryland',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Centers', [{}])
};
