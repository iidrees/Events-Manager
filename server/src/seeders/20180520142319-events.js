'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Events',
      [
        {
          description:
            'This dinner is meant to be attended by all the D0 fellows ',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg',
          title: 'The Phoenix Party',
          date: '2020-05-26',
          center: 'Ketu-ojota-mall',
          userId: 1,
          centerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description:
            'This dinner is meant to be attended by all the D0 fellows ',
          imgUrl:
            'https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg',
          title: 'The Phoenix Party',
          date: '2020-05-27',
          center: 'Ketu-ojota-mall',
          userId: 1,
          centerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Events', [{}])
};
