/* TEST FOR NONE AVAILABLE CENTERS */
import { assert } from 'chai';
import request from 'supertest';
import app from '../../src/server';
import { Users, Events, Centers } from '../../src/models';

import { seedUser, seedCenter } from '../testHelpers/testSeed';

import { user1Token, userAdmin, userSuperAdmin } from '../testHelpers/auth';

/* eslint-disable */
let token;
let newToken;
let superAdminToken;
let adminToken;
const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';

describe('TEST EVENT ENDPOINTS', () => {
  before(done => {
    seedCenter();
    token = user1Token;
    adminToken = userAdmin;
    superAdminToken = userSuperAdmin;
    done();
  });
  describe('POST "/api/v1/events"', () => {
    it('should return "No token supplied" for wrong credentials when a user does not send a token with their request', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          attendance: '200'
        })
        .expect(401)
        .then(res => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No token supplied');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it('should return "Session Expired, Please signin again" when a user\'s token has expired', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          attendance: '200',
          userId: 1
        })
        .expect(403)
        .then(res => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Session Expired, Please signin again.'
          );
          assert.deepEqual(res.status, 403);
          done();
        });
    });
    it('should not create an event for an event in the past', done => {
      request(app)
        .post(`/api/v1/events/${3}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-01-07',
          endDate: '2018-01-14',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Invalid date entered, please enter a date from the current date'
          );
          done();
        });
    });
    it('should return "Center Not Found" when a user enters a center not in the database', done => {
      request(app)
        .post(`/api/v1/events/${3}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-07',
          endDate: '2018-08-14',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
    it('should return "Success" for creating an event, when a user succesfully creates a center', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-07',
          endDate: '2018-08-14',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(201)
        .then(res => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Event added successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(
            res.body.data.description,
            'Its an event for fela abeg'
          );
          assert.deepEqual(res.body.data.startDate, '2018-08-07');
          assert.deepEqual(res.body.data.endDate, '2018-08-14');
          assert.deepEqual(res.body.data.center, 'Ketu-ojota-mall');
          assert.deepEqual(
            res.body.data.imgUrl,
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
          );
          done();
        });
    });
    it('should return "date already booked for this center, choose another" for unique data validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-07',
          endDate: '2018-08-14',
          center: 'Ketu-ojota-mall',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'There is an event already scheduled for this day, kindly pick another date.'
          );
          done();
        });
    });
    it('should return "This is the valid date format YYYY-MM-DD" for unique date validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018/08/07',
          endDate: '2018/08/14',
          center: 'Ketu-ojota-mall',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            "This is the valid date format  'YYYY-MM-DD'"
          );
          done();
        });
    });
    it('should return "Please fill all input fields" when a user does not upload an image', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-20',
          endDate: '2018-08-21',
          center: 'Ketu-ojota-mall'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please fill all input fields');

          done();
        });
    });
    it('should return "Please all form fields are required to be filled" for image null model validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-20',
          endDate: '2018-08-21',
          center: 'Ketu-ojota-mall',
          imgUrl: ''
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Please all form fields are required to be filled'
          );
          done();
        });
    });
    it('should return "Please all form fields are required to be filled" when a user enters no description', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: '',
          startDate: '2018-08-23',
          endDate: '2018-08-23',
          center: 'Ketu-ojota-mall',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Please all form fields are required to be filled'
          );
          done();
        });
    });

    it('should return "Unsuccesful" when a users enters a non-integer as req.params', done => {
      request(app)
        .post(`/api/v1/events/@`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          startDate: '2018-08-24',
          endDate: '2018-08-25',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(400)
        .then(res => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Please ensure you are entering the centerId as an integer in the req.params'
          );
          assert.deepEqual(res.status, 400);
          done();
        });
    });
  });
  describe('GET /api/v1/events', () => {
    it('should return "These are all Events" when  a user retrieves all events with the event', done => {
      request(app)
        .get(`/api/v1/events?page=${1}`)
        .set('x-access-token', token)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are all Events');
          done();
        });
    });
  });
  describe('Test PUT/ modify "/api/v1/events/:eventId" endpoint', () => {
    it('Should return "Event Not Found" when a user tries to edit an event not present in the database', done => {
      request(app)
        .put(`/api/v1/events/${13}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          startDate: '2018-08-24',
          endDate: '2018-08-25',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.message, 'Event Not Found');
          done();
        });
    });
    it('Should return "Please ensure you are entering a value" when a user enters wrong params in the url', done => {
      request(app)
        .put('/api/v1/events/*')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          startDate: '2018-08-26',
          endDate: '2018-08-27',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(
            res.body.message,
            'Please ensure you are entering a value'
          );
          done();
        });
    });

    it('Should return "Unauthorized" if user attempts to update an event they didnt create', done => {
      request(app)
        .put(`/api/v1/events/${1}`)
        .set('x-access-token', adminToken)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          startDate: '2018-08-28',
          endDate: '2018-08-29',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(
            res.body.message,
            'you are not authorized to perform this action'
          );

          done();
        });
    });
    it('Should return "Event updated successfully" if user event is found and updated', done => {
      request(app)
        .put(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          startDate: '2018-08-28',
          endDate: '2018-08-29',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(201)
        .then(res => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.message, 'Event updated successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(
            res.body.data.description,
            'It not fela anymore anymore oo'
          );
          assert.deepEqual(res.body.data.startDate, '2018-08-28');
          assert.deepEqual(res.body.data.center, 'Ketu-ojota-mall');
          done();
        });
    });

    it('Should return "Session Expired, Please signin again." when user supplies expired token during an edit process', done => {
      request(app)
        .put(`/api/v1/events/${4}`)
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: '',
          startDate: '2018-09-01',
          endDate: '2018-09-02',
          center: 'Lagos Lagoon'
        })
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(
            res.body.message,
            'Session Expired, Please signin again.'
          );
          done();
        });
    });
    /* CANCEL AN EVENT*/

    it('should return "Not event found", when event to be cancelled does not exists', done => {
      request(app)
        .put(`/api/v1/cancelEvent/${34}`)
        .set('x-access-token', superAdminToken)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.message, 'No event found');
          done();
        });
    });
    it('should cancel an event, when an admin cancels an event by its Id', done => {
      request(app)
        .put(`/api/v1/cancelEvent/${1}`)
        .set('x-access-token', superAdminToken)
        .expect(201)
        .then(res => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.message, 'This is your cancelled event');
          done();
        });
    });
    it('should return "Event already cancelled", when an admin wants to cancel an event again', done => {
      request(app)
        .put(`/api/v1/cancelEvent/${1}`)
        .set('x-access-token', superAdminToken)
        .expect(409)
        .then(res => {
          assert.deepEqual(res.status, 409);
          assert.deepEqual(res.body.message, 'Event already cancelled');
          done();
        });
    });
    it('should return "Event could not be cancelled", when an admin wants to cancel an event not in their center', done => {
      request(app)
        .put(`/api/v1/cancelEvent/*`)
        .set('x-access-token', adminToken)
        .expect(400)
        .then(res => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.message, 'there was an error');
          done();
        });
    });
  });
  describe('GET /api/v1/events/:<eventId>', () => {
    it('Should return "Success" when a user request for an event they created', done => {
      request(app)
        .get(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'This is your event');
          done();
        });
    });

    it('Should return "Unsuccessful" when a user request for an event they did not creat', done => {
      request(app)
        .get(`/api/v1/events/${1}`)
        .set('x-access-token', adminToken)
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'You are not authorized to carry out this action'
          );
          done();
        });
    });

    it('Should return "Success" when a user request for all eventa created', done => {
      request(app)
        .get(`/api/v1/events`)
        .set('x-access-token', token)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are all Events');
          done();
        });
    });

    it('Should return "Success" when a user request for all eventa they created', done => {
      request(app)
        .get(`/api/v1/events/userevents`)
        .set('x-access-token', token)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are your Events');
          done();
        });
    });
    it('Should return "No event available, please post an event" when a user enters a wrong eventId', done => {
      request(app)
        .get(`/api/v1/events/${2}`)
        .set('x-access-token', token)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No such event is available');
          done();
        });
    });
    it('Should return "No such event is available" for wrong params input  ', done => {
      request(app)
        .get('/api/v1/events/*')
        .set('x-access-token', token)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No such event is available');
          done();
        });
    });
  });
});

/* TEST FOR DELETE AN EVENT */
describe('DEL /api/v1/events/:eventId ', () => {
  it('Should return "Event Not Found" when a user enters wrong eventId', done => {
    request(app)
      .del(`/api/v1/events/${3}`)
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No such event is available');
        done();
      });
  });

  it('Should return "Unauthorized" when a user attemps deleting an event they did not create', done => {
    request(app)
      .del(`/api/v1/events/${1}`)
      .set('x-access-token', adminToken)
      .expect(403)
      .then(res => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(
          res.body.message,
          'You are unauthorised from performing this action'
        );
        done();
      });
  });
  it('Should return "No such event is available" when a user enters a wrong params input in the url', done => {
    request(app)
      .del('/api/v1/events/*')
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No such event is available');
        done();
      });
  });
  it('Should return "Event Successfully Deleted" when a user enters a correct params input in the url', done => {
    request(app)
      .del(`/api/v1/events/${1}`)
      .set('x-access-token', token)
      .expect(200)
      .then(res => {
        assert.deepEqual(res.status, 200);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Event Successfully Deleted');
        done();
      });
  });

  /*
The rest of the GET requests 
*/
  it('Should return "Event Not Found" when a user requests for all events and no events in the database', done => {
    request(app)
      .get(`/api/v1/events?page=${1}`)
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No Event(s) Found');
        done();
      });
  });

  /**
   * GETTING ALL EVENTS AFTER EVENT HAS BEEN DELETED
   */
  it('Should return "No event(s) found" when there no events in the database', done => {
    request(app)
      .get(`/api/v1/events`)
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No Event(s) Found');
        done();
      });
  });

  it('Should return "No event(s) found" when there no events in the database', done => {
    request(app)
      .get(`/api/v1/events/userevents`)
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No Event(s) Found');
        done();
      });
  });
});
