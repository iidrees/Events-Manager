import { assert } from 'chai';
import request from 'supertest';
import app from '../src/server';
import { Users, Events, Centers } from '../src/models';

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Centers.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

let token;
// testing the server
describe('Server and status', () => {
  describe('GET "/home/" ', () => {
    it('should return 200 OK', (done) => {
      request(app)
        .get('/home/')
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body.message, 'Welcome to the Events Manager API');
          assert.deepEqual(res.status, 200);
          done();
        })
        .catch(err => done(err));
    });
  });
});

describe('Sign-up and Sign-in Endpoints',() => {
  describe('Test Sign-up "/api/v1/users" endpoint', () => {
    it('should return "Please enter a password" for an empty input field', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'Idrees',
          email: 'tester@gmail.com',
          password: '',
          confirmPassword: ''
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter a password');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Please your password do not match"', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'Idrees',
          email: 'tester@gmail.com',
          password: 'idrees',
          confirmPassword: ''
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Your password do not match');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Password cannot be less than 8 characters"', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'Idrees',
          email: 'tester@gmail.com',
          password: 'idrees',
          confirmPassword: 'idrees'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Password cannot be less than 8 characters');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return status "Success" for a successful sign-up', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'tester',
          email: 'tester@gmail.com',
          password: 'idreeskun',
          confirmPassword: 'idreeskun'
        })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Your account has been created');
          assert.deepEqual(res.body.name, 'tester');
          assert.deepEqual(res.body.id, 1);
          assert.deepEqual(res.status, 201);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "name already exists" for duplicate entries', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'tester',
          email: 'tester@gmail.com',
          password: 'idreeskun',
          confirmPassword: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'This name already exist, enter a new name');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Please enter a valid email address" for empty input', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'tester',
          email: '',
          password: 'idreeskun',
          confirmPassword: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter a valid email address');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "the email already exists, enter a new email" for same email sign-up', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'idrees',
          email: 'tester@gmail.com',
          password: 'idreeskun',
          confirmPassword: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'This email already exist, enter a new email address');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('Test sign-in "/api/v1/users/login" endopoint', () => {
    it('should return "User Not Found" for a wrong email', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'test@gmail.com',
          password: 'idreeskun',
          confirmPassword: 'idreeskun'
        })
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'User Not Found');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Please enter your password"', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'tester@gmail.com',
          password: '',
          confirmPassword: ''
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter your password');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Please enter your email"', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: '',
          password: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter your email address');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Success" for token generation', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'tester@gmail.com',
          password: 'idreeskun'
        })
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Token successfully generated and signin successful');
          assert.deepEqual(res.status, 200);
          token = res.body.data;
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Incorrect login details supplied" for wrong password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'tester@gmail.com',
          password: 'idreeskuni'
        })
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Incorrect login details supplied');
          assert.deepEqual(res.status, 403);
          token = res.body.data;
          done();
        })
        .catch(err => done(err));
    });
  });
});
