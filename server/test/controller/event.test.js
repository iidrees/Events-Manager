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
    it('should return "Unauthorized" for wrong credentials', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12:03 PM',
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
    it('should return "Unsuccessful" when a user enters wrong credentials', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12:03 PM',
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

    it('should return "Unsuccessful" for supplying a center not existing', done => {
      request(app)
        .post(`/api/v1/events/${3}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
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
    it('should return "Success" for creating an event', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
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
          assert.deepEqual(res.body.data.date, '2018-03-07');
          assert.deepEqual(res.body.data.time, '12:03 PM');
          assert.deepEqual(res.body.data.center, 'Ketu-ojota-mall');
          assert.deepEqual(
            res.body.data.imgUrl,
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
          );
          done();
        });
    });
    it('should return "Date already booked, enter another date" for unique data validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
          center: 'Ketu-ojota-mall',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(409)
        .then(res => {
          assert.deepEqual(res.status, 409);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'date already booked for this center, choose another'
          );
          done();
        });
    });
    it('should return "This is the valid date format \'YYYY-MM-DD" for unique date validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '08-08-2018',
          time: '12:03 PM',
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
    it('should return "Events.imgUrl cannot be null" for image null model validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-10',
          time: '12:03 PM',
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
    it('should return "Image is required" for image null model validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-10',
          time: '12:03 PM',
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
    it('should return "Enter a description" for unique data validation', done => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: '',
          date: '2018-03-08',
          time: '12:03 PM',
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
  });
  describe('GET /api/v1/events', () => {
    it('should return "These are your Events" when all events retrieved', done => {
      request(app)
        .get('/api/v1/events')
        .set('x-access-token', token)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are your Events');
          done();
        });
    });
  });
  describe('Test PUT/ modify "/api/v1/events/:eventId" endpoint', () => {
    it('Should return "Event Not Found" if event not found', done => {
      request(app)
        .put(`/api/v1/events/${4}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12:03 PM',
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
    it('Should return "Please ensure you are entering a value" for wrong params input', done => {
      request(app)
        .put('/api/v1/events/*')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12:03 PM',
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
    it('Should return "Event updated successfully" if event found and updated', done => {
      request(app)
        .put(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12:03 PM',
          imgUrl:
            'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.message, 'Event updated successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(
            res.body.data.description,
            'It not fela anymore anymore oo'
          );
          assert.deepEqual(res.body.data.date, '2018-03-08');
          assert.deepEqual(res.body.data.time, '12:03 PM');
          assert.deepEqual(res.body.data.center, 'Ketu-ojota-mall');
          done();
        });
    });
    it('Should return "Unauthorized" if expired token supplied', done => {
      request(app)
        .put(`/api/v1/events/${4}`)
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: '',
          date: '2018-03-08',
          time: '12-03 PM',
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
  });
  describe('GET /api/v1/events/:<eventId>', () => {
    it('Should return "Success" for getting an event', done => {
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
    it('Should return "Unsuccessful" for wrong eventId', done => {
      request(app)
        .get(`/api/v1/events/${2}`)
        .set('x-access-token', token)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'No event available, please post an event'
          );
          done();
        });
    });
    it('Should return "Unsuccessful" for wrong params input  ', done => {
      request(app)
        .get('/api/v1/events/*')
        .set('x-access-token', token)
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No such event is available');
          done();
        });
    });
  });
});

/* TEST FOR DELETE AN EVENT */
describe('DEL /api/v1/events/:eventId ', () => {
  it('Should return "Event Not Found" for wrong eventId', done => {
    request(app)
      .del(`/api/v1/events/${3}`)
      .set('x-access-token', token)
      .expect(404)
      .then(res => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Event Not Found');
        done();
      });
  });
  it('Should return "No such event is available" for wrong params input', done => {
    request(app)
      .del('/api/v1/events/*')
      .set('x-access-token', token)
      .expect(422)
      .then(res => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No such event is available');
        done();
      });
  });
  it('Should return "Event Successfully Deleted" for correct eventId', done => {
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

  it('Should return "Event Not Found" when no events in the database', done => {
    request(app)
      .get('/api/v1/events')
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
