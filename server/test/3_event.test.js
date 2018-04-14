/* TEST FOR NONE AVAILABLE CENTERS */
import { assert } from 'chai';
import request from 'supertest';
import app from '../src/server';
import { 
  Users, 
  Events, 
  Centers 
} from '../src/models';

/* eslint-disable */
import {token }from './1_user.test.js'
import {newToken} from './1_user.test.js'
import {adminToken} from './1_user.test.js'
import {superAdminToken} from './1_user.test.js'
import {expiredToken} from './1_user.test.js'




describe('TEST EVENT ENDPOINTS', () => {
  /* TESTS FOR EVENTS */
  describe('Test POST "/api/v1/events"', () => {
    it('should return "Unauthorized" for wrong credentials', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12:03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          attendance: '200',
        })
        .expect(401)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No token supplied');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it('should return "Unsuccessful" when a user enters wrong credentials',
     (done) => {
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
        .then((res) => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Session Expired, Please signin again.');
          assert.deepEqual(res.status, 403);
          done();
        });
    });

    it('should return "Unsuccessful" for supplying a center not existing', (done) => {
      request(app)
        .post(`/api/v1/events/${3}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
    it('should return "Success" for creating an event', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Event added successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(res.body.data.description, 'Its an event for fela abeg');
          assert.deepEqual(res.body.data.date, '2018-03-07');
          assert.deepEqual(res.body.data.time, '12:03 PM');
          assert.deepEqual(res.body.data.center, 'Muson Center');
          assert.deepEqual(res.body.data.imgUrl, 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg')
          done();
        });
    });
    it('should return "Date already booked, enter another date" for unique data validation', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-07',
          time: '12:03 PM',
          center: 'Muson Center',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(409)
        .then((res) => {
          assert.deepEqual(res.status, 409);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'date already booked for this center, choose another');
          done();
        });
    });
    it('should return "Events.imgUrl cannot be null" for image null model validation', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-10',
          time: '12-03 PM',
          center: 'Muson Center',
        })
        .expect(422)
        .then((res) => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please fill all input fields');
          
          done();
        });
    });
    it('should return "Image is required" for image null model validation', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-10',
          time: '12-03 PM',
          center: 'Muson Center',
          imgUrl:''
        })
        .expect(422)
        .then((res) => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please all form fields are required to be filled');
          done();
        });
    });
    it('should return "Enter a description" for unique data validation', (done) => {
      request(app)
        .post(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: '',
          date: '2018-03-08',
          time: '12:03 PM',
          center: 'Muson Center',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then((res) => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please all form fields are required to be filled')
          done();
        });
    });
  });
  describe('Test the retrieval of all events', () => {
    it('should return "These are your Events" when all events retrieved', (done) => {
      request(app)
        .get('/api/v1/events')
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are your Events');
          done();
        });
    });
  });
  describe('Test PUT/ modify "/api/v1/events/:eventId" endpoint', () => {
    it('Should return "Event Not Found" if event not found', (done) => {
      request(app)
        .put(`/api/v1/events/${4}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12:03 PM',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.message, 'Event Not Found');
          done();
        });
    });
    it('Should return "Please ensure you are entering a value" for wrong params input', (done) => {
      request(app)
        .put('/api/v1/events/*')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12-:3 PM',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(422)
        .then((res) => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.message, 'Please ensure you are entering a value');
          done();
        });
    });
    it('Should return "Event updated successfully" if event found and updated', (done) => {
      request(app)
        .put(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12:03 PM',
          imgUrl: 'https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg'
        })
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.message, 'Event updated successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(res.body.data.description, 'It not fela anymore anymore oo');
          assert.deepEqual(res.body.data.date, '2018-03-08');
          assert.deepEqual(res.body.data.time, '12:03 PM');
          assert.deepEqual(res.body.data.center, 'Muson Center');
          done();
        });
    });
    it('Should return "Unauthorized" if expired token supplied', (done) => {
      request(app)
        .put(`/api/v1/events/${4}`)
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: '',
          date: '2018-03-08',
          time: '12-03 PM',
          center: 'Lagos Lagoon',
        })
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.message, 'Session Expired, Please signin again.');
          done();
        });
    });
  });
  describe('Test for the retrieval of an event', () => {
    it('Should return "Success" for getting an event', (done) => {
      request(app)
        .get(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'This is your event');
          done();
        });
    });
    it('Should return "Unsuccessful" for wrong eventId', (done) => {
      request(app)
        .get(`/api/v1/events/${2}`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No event available, please post an event');
          done();
        });
    });
    it('Should return "Unsuccessful" for wrong params input  ', (done) => {
      request(app)
        .get('/api/v1/events/*')
        .set('x-access-token', token)
        .expect(422)
        .then((res) => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No such event is available');
          done();
        });
    });
  });
});



/* TEST FOR DELETE AN EVENT */
describe('Test DEL "/api/v1/events/:eventId" endpoint ', () => {
  it('Should return "Event Not Found" for wrong eventId', (done) => {
    request(app)
      .del(`/api/v1/events/${3}`)
      .set('x-access-token', token)
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Event Not Found');
        done();
      });
  });
  it('Should return "No such event is available" for wrong params input', (done) => {
    request(app)
      .del('/api/v1/events/*')
      .set('x-access-token', token)
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No such event is available');
        done();
      });
  });
  it('Should return "Event Successfully Deleted" for correct eventId', (done) => {
    request(app)
      .del(`/api/v1/events/${1}`)
      .set('x-access-token', token)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.status, 200);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Event Successfully Deleted');
        done();
      });
  });

  it('Should return "Event Not Found" when no events in the database', (done) => {
    request(app)
      .get('/api/v1/events')
      .set('x-access-token', token)
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No Event(s) Found');
        done();
      });
  });
  
});



/* TEST FOR DELETE A CENTER */
describe('Test DEL "/api/v1/centers/:centerId" endpoint ', () => {
  it('Should return "403" unauthorized', (done) => {
    request(app)
      .del(`/api/v1/centers/${3}`)
      .set('x-access-token', token)
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'You are not permitted to delete this event center');
        done();
      });
  });
  it('Should return "Center Not Found"', (done) => {
    request(app)
      .del(`/api/v1/centers/${3}`)
      .set('x-access-token', adminToken)
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Center Not Found');
        done();
      });
  });
  it('Should return "Unable to delete center, please try again later" for wrong params input', (done) => {
    request(app)
      .del('/api/v1/centers/$')
      .set('x-access-token', adminToken)
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'CenterId must be a number');
        done();
      });
  });
  it('Should return "Unable to delete center, please try again later" for wrong params input', (done) => {
    request(app)
      .del(`/api/v1/centers/${1}`)
      .set('x-access-token', adminToken)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.status, 200);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center Successfuly Deleted');
        done();
      }); 
  });
});
