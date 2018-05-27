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
          center: 'Ketu-ojota-mall',
          startDate: new Date('2020-05-26'),
          endDate: new Date('2020-05-30'),
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
          startDate: new Date('2020-06-26'),
          endDate: new Date('2020-06-30'),
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
