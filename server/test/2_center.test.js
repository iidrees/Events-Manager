
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


/* TESCT FOR NONE AVAILABLE CENTERS */
describe('GET /api/v1/centers', () => {
  it('should return "No Centers Found" when query made to an empty database', (done) => {
    request(app)
      .get('/api/v1/centers')
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'No Centers Found');
        done();
      })
  });
});

/* TEST POST CENTER */
describe('POST /api/v1/centers', () => {
  it('should return "Unsuccessful" when a non-admin tries to create a center', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', token)
      .send({
        name: 'Muson Center',
        location: 'Lagos',
        address: 'Fela\'s shrine',
        owner: 'The Civil Society',
        capacity: '2000',
        description: 'This venue is a great place to make things happen',
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'You are not permitted to create a center');
        done();
      });
  });
  it('should add center on "/api/v1/centers" endpoint when an admin adds a center', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', adminToken)
      .send({
        name: 'Muson Center',
        location: 'Lagos',
        address: 'Fela\'s shrine',
        owner: 'The Civil Society',
        capacity: '2000',
        description: 'This venue is a great place to make things happen',
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.status, 201);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center Added Successfully');
        done();
      });
  });
  it('should return an error for empty string input', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', adminToken)
      .send({
        name: 'Muson Center',
        location: 'Lagos',
        address: 3,
        owner: 'The Civil Society',
        capacity: '2000',
        description: 'This venue is a great place to make things happen',
      })
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Please fill all input fields');
        done();
      });
  });
  it('should return an error when user enters no address', (done) => {
    request(app)
      .post('/api/v1/centers')
      .set('x-access-token', adminToken)
      .send({
        name: 'Muson Center',
        location: 'Lagos',
        address:'',
        owner: 'The Civil Society',
        capacity: '2000',
        description: 'This venue is a great place to make things happen',
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Please all form fields are required to be filled');
        done();
      });
  });
  it('should return "capacity of a center should be a number"', (done) => {
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
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Capacity of a center should be a number');
        done();
      });
  });
});

/* TEST FOR MODIFY/EDIT/PUT CENTERS */
describe('PUT /api/v1/centers/:<centerId>', () => {
  it('Should return "Unauthorized" for wrong token', (done) => {
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
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'You are not permitted to edit or modify this resource');
        done();
      });
  });
  it('Should return "Center Not found" where center not in database', (done) => {
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
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Center Not Found');
        done();
      });
  });
  it('Should return "Center successfully updated" when correct credentials supplied', (done) => {
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
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.status, 201);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center successfully updated');
        done();
      });
  });
  it('Should return "Please input correct value" when wrong input supplied', (done) => {
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
        imgUrl: 'http://res.cloudinary.com/idreeskun/image/upload/v1521067975/tpffsaf7hmkoksqzq7sq.jpg'
      })
      .expect(422)
      .then((res) => {
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
    it('should return "Center Not Found" for a wrong req.param', (done) => {
      request(app)
        .get(`/api/v1/centers/${3}`)
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.message, 'Center Not Found');
          done();
        });
    });
  });
  it('should return "Success" for a successful query for a single event center', (done) => {
    request(app)
      .get(`/api/v1/centers/${1}`)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.status, 200);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'These are the event centers');
        done();
      });
  });
  it('should return "Center Not Found" for a "-1" query', (done) => {
    request(app)
      .get(`/api/v1/centers/${-1}`)
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Center Not Found');
        done();
      });
  });
  it('should return "Center Not Found" for a "*" query', (done) => {
    request(app)
      .get('/api/v1/centers/*')
      .expect(422)
      .then((res) => {
        assert.deepEqual(res.status, 422);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.data, 'invalid input syntax for integer: "*"');
        done();
      });
  });
  describe('Test for getting all centers', () => {
    it('should return "Success" and centers for a query for all centers', (done) => {
      request(app)
        .get('/api/v1/centers')
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Centers found');
          done();
        });
    });
  });
});

