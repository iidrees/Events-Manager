/* TEST FOR NONE AVAILABLE CENTERS */
import { assert } from 'chai';
import request from 'supertest';
import app from '../../src/server';
import { Users, Events, Centers } from '../../src/models';

import { seedUser } from '../testHelpers/testSeed';

import { user1Token, userAdmin, userSuperAdmin } from '../testHelpers/auth';

let token;
let newToken;
let superAdminToken;
let adminToken;
const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';

/* TEST FOR NONE AVAILABLE CENTERS */
describe('Centers Controller', () => {
  before(done => {
    seedUser();
    token = user1Token;
    adminToken = userAdmin;
    superAdminToken = userSuperAdmin;
    done();
  });
  describe('GET /api/v1/centers', () => {
    it('should return "No Centers Found" when user makes query to an empty database', done => {
      request(app)
        .get('/api/v1/centers')
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No Centers Found');
          done();
        });
    });
  });

  /* TEST POST CENTER */
  describe('POST /api/v1/centers', () => {
    it('should return "Unsuccessful" when a non-admin user makes a POST request to create a center', done => {
      request(app)
        .post('/api/v1/centers')
        .set('x-access-token', token)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: "Fela's shrine",
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'You are not permitted to create a center'
          );
          done();
        });
    });
    it('should add a new center succesfully on "/api/v1/centers" endpoint when an admin adds a center', done => {
      request(app)
        .post('/api/v1/centers')
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: "Fela's shrine",
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(201)
        .then(res => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Center Added Successfully');
          done();
        });
    });
    it('should return "Please fill all input fields" when admin user enters no address ', done => {
      request(app)
        .post('/api/v1/centers')
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: undefined,
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please fill all input fields');
          done();
        });
    });
    it('should return "Please fill all input fields" when admin user enters no address', done => {
      request(app)
        .post('/api/v1/centers')
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: '',
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
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
    it('should return "capacity of a center should be a number" when a user enter entries other than numbers', done => {
      request(app)
        .post('/api/v1/centers')
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: 'adreesssssss',
          owner: 'The Civil Society',
          capacity: '@@@',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Capacity of a center should be a number'
          );
          done();
        });
    });
  });

  /* TEST FOR MODIFY/EDIT/PUT CENTERS */
  describe('PUT /api/v1/centers/:<centerId>', () => {
    it('Should return "Unauthorized" when admin  attempts to edit a center and token has expired', done => {
      request(app)
        .put(`/api/v1/centers/${1}`)
        .set('x-access-token', token)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: 'The Shrine',
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'You are not permitted to edit or modify this resource'
          );
          done();
        });
    });
    it('Should return "Center Not found" when admin attempts to edit a center not in database', done => {
      request(app)
        .put(`/api/v1/centers/${4}`)
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: 'The Shrine',
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
    it('Should return "Center successfully updated" when an admin has successfully updated a center', done => {
      request(app)
        .put(`/api/v1/centers/${1}`)
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: 'The Shrine',
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(201)
        .then(res => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Center successfully updated');
          done();
        });
    });
    it('Should return "Please input correct value" when user enters wrong req.parameter supplied', done => {
      request(app)
        .put('/api/v1/centers/$')
        .set('x-access-token', adminToken)
        .send({
          name: 'Muson Center',
          location: 'Lagos',
          address: 'The Shrine',
          owner: 'The Civil Society',
          capacity: '2000',
          description: 'This venue is a great place to make things happen',
          imgUrl:
            'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
        })
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please input correct value');
          done();
        });
    });
  });

  /* TEST FOR AVAILABILITY OF CENTERS */
  describe('GET /api/v1/centers', () => {
    describe('Get A Single Center', () => {
      it('should return "Center Not Found" when a user enters a wrong req.param', done => {
        request(app)
          .get(`/api/v1/centers/${3}`)
          .expect(404)
          .then(res => {
            assert.deepEqual(res.status, 404);
            assert.deepEqual(res.body.message, 'Center Not Found');
            done();
          });
      });
    });
    it('should return "Success" for a successful query for a single event center by a user', done => {
      request(app)
        .get(`/api/v1/centers/${1}`)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'These are the event centers');
          done();
        });
    });
    it('should return "Center Not Found" for a "-1" request by a user for a center', done => {
      request(app)
        .get(`/api/v1/centers/${-1}`)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
    it('should return "Center Not Found" for a "*" query by a user for a center', done => {
      request(app)
        .get('/api/v1/centers/*')
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.data,
            'invalid input syntax for integer: "*"'
          );
          done();
        });
    });
    describe('Test for getting all centers', () => {
      it('should return "Success" and centers for a query by a user for all centers', done => {
        request(app)
          .get('/api/v1/centers')
          .expect(200)
          .then(res => {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(res.body.message, 'Centers found');
            done();
          });
      });
    });
  });

  /* TEST FOR DELETE A CENTER */
  describe('DEL /api/v1/centers/:centerId', () => {
    it('Should return "403" unauthorized when an ordinary user attemtps to delete a center', done => {
      request(app)
        .del(`/api/v1/centers/${3}`)
        .set('x-access-token', token)
        .expect(403)
        .then(res => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'You are not permitted to delete this event center'
          );
          done();
        });
    });
    it('Should return "Center Not Found" when an authorized admin attemtps to delete a center not in the database', done => {
      request(app)
        .del(`/api/v1/centers/${3}`)
        .set('x-access-token', adminToken)
        .expect(404)
        .then(res => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
    it('Should return "Unable to delete center, please try again later" when an admin enters a wrong params input as req.params', done => {
      request(app)
        .del('/api/v1/centers/$')
        .set('x-access-token', adminToken)
        .expect(422)
        .then(res => {
          assert.deepEqual(res.status, 422);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'CenterId must be a number');
          done();
        });
    });
    it('Should return "Center Successfully Deleted" when an authorized admin succeeds at deleting a center', done => {
      request(app)
        .del(`/api/v1/centers/${1}`)
        .set('x-access-token', adminToken)
        .expect(200)
        .then(res => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Center Successfuly Deleted');
          done();
        });
    });
  });
});
