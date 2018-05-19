import { assert } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../src/server';
import { Users, Events, Centers } from '../../src/models';
import { users, seedUser } from '../testHelpers/testSeed';

/* eslint-disable */
let token;
let newToken;
let superAdminToken;
let adminToken;
const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';
// testing the server
describe('Server and status', () => {
  describe('GET "/home/" ', () => {
    it('should return 200 OK', done => {
      request(app)
        .get('/home/')
        .expect(200)
        .then(res => {
          assert.deepEqual(
            res.body.message,
            'Welcome to the Events Manager API'
          );
          assert.deepEqual(res.status, 200);
          done();
        });
    });
  });
});
/* TESTING SIGNUP AND SIGNIN ENDPOINTS */
describe('Sign-up and Sign-in Endpoints', () => {
  describe('POST "/api/v1/users"', () => {
    it('should return "Please enter a password" when a user enters no password', done => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'Idrees',
          email: 'tester@gmail.com',
          password: '',
          confirmPassword: ''
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please enter a password');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it(`should return "Please enter the required input in all required fields" 
    when a user sends a request with an empty field`, done => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: undefined,
          email: 'tester@gmail.com',
          password: '',
          confirmPassword: ''
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Please enter the required input in all required fields'
          );
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it('should return "Please enter a valid email address" when a user enters an email that does not match any known email format', done => {
      request(app)
        .post('/api/v1/users')
        .send({
          name: 'Idrees',
          email: 'testergmail.com',
          password: '11111111',
          confirmPassword: '1111111111'
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(
            res.body.message,
            'Please enter a valid email address'
          );
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it(
      'should return "Please your password do not match"' +
        ' when a user enters no value in the password confirmation field',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'Idrees',
            email: 'tester@gmail.com',
            password: 'idrees',
            confirmPassword: ''
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'Your password do not match');
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
    it(
      'should return "Password cannot be less than 8 characters"' +
        ' when a user enters a password that is less than 8 characters',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'Idrees',
            email: 'tester@gmail.com',
            password: 'idrees',
            confirmPassword: 'idrees'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'Password cannot be less than 8 characters'
            );
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
    it(
      'should return status "Success" for a successful sign-up' +
        ' when a user enters all input fields correctly',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'tester',
            email: 'tester@gmail.com',
            password: 'idreeskun',
            confirmPassword: 'idreeskun'
          })
          .expect(201)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(
              res.body.message,
              'You are signed up successfully.'
            );
            assert.deepEqual(res.status, 201);
            token = res.body.data.token;

            done();
          });
      }
    );
    it(
      'should return "Password must contain letters and numerals" when entered is not alphanumaric',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'tester',
            email: 'tester@gmail.com',
            password: '@@@@@@@@',
            confirmPassword: '@@@@@@@@'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'Password must contain letters and numerals'
            );
            assert.deepEqual(res.status, 401);

            done();
          });
      }
    );
    it(
      'should return "name already exists" when a user enters' +
        ' a name already existing in the database',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'tester',
            email: 'tester@gmail.com',
            password: 'idreeskun',
            confirmPassword: 'idreeskun'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'User signup was unsuccessful');
            assert.deepEqual(
              res.body.error,
              'This name already exist, enter a new name'
            );
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
    it(
      'should return "Please enter your email address"' +
        ' when a user does not enter any value in the email field',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'tester',
            email: '',
            password: 'idreeskun',
            confirmPassword: 'idreeskun'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'Please enter your email address'
            );
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
    it(
      'should return "the email already exists, enter a new email" ' +
        ' when a user enters an existing email in the database',
      done => {
        request(app)
          .post('/api/v1/users')
          .send({
            name: 'idrees',
            email: 'tester@gmail.com',
            password: 'idreeskun',
            confirmPassword: 'idreeskun'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'User signup was unsuccessful');
            assert.deepEqual(
              res.body.error,
              'This email already exist, enter a new email address'
            );
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
  });
  describe('POST "/api/v1/users/login" ', () => {
    it('should return "Email or password is invalid" when a user enters an incorrect email or password', done => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'test@gmail.com',
          password: 'idreeskun'
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Email or Password is invalid');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it('should return "please enter all fields" when user enters no email in the email field', done => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: undefined,
          password: 'idreeskun'
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please enter all fields');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it(
      'Should return "Please enter your password"' +
        ' when a user enters no password in the password field',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'tester@gmail.com',
            password: ''
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'Please enter your password');
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );

    it('Should return "Please enter your email" when a user enters no email but sends an empty string', done => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: '',
          password: 'idreeskun'
        })
        .expect(401)
        .then(res => {
          assert.typeOf(res.body, 'object');
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please enter your email address');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it(
      'Should return "Please enter your email in this format  this format \'joe@example.com\'"' +
        ' when a user enters an email in the wrong format',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'idrees.asas.c',
            password: 'idreeskun'
          })
          .expect(401)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              "Please enter your email address in this format 'joe@example.com'"
            );
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
    it(
      'Should return "Success" for token generation' +
        ' after a user enters correct login details',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'tester@gmail.com',
            password: 'idreeskun'
          })
          .expect(200)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(
              res.body.message,
              'Token successfully generated and signin successful'
            );
            assert.deepEqual(res.status, 200);
            newToken = res.body.data;
            done();
          });
      }
    );
    it(
      'Should return "Success" for superAdmin token generation' +
        ' when a superAdmin supply correct login details',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'idreeskun@kun.com',
            password: 'password'
          })
          .expect(200)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(
              res.body.message,
              'Token successfully generated and signin successful'
            );
            assert.deepEqual(res.status, 200);
            superAdminToken = res.body.data.token;

            done();
          });
      }
    );
    it(
      'Should return "Email or Password is invalid"' +
        ' when a user enters wrong password',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'tester@gmail.com',
            password: 'idreeskuni'
          })
          .expect(401)
          .then(res => {
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'User signin was unsuccessful');
            assert.deepEqual(res.body.error, 'Email or Password is invalid');
            assert.deepEqual(res.status, 401);
            done();
          });
      }
    );
  });
});

describe('TEST FOR ADMIN', () => {
  describe('Test creation of an admin', () => {
    it(
      'should return "Unsuccessful" when an ordinary user tries to create' +
        ' an admin',
      done => {
        request(app)
          .put(`/api/v1/users/admin/${2}`)
          .set('x-access-token', token)
          .expect(403)
          .then(res => {
            assert.deepEqual(res.status, 403);
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'You are unauthorised to carry out this action'
            );
            done();
          });
      }
    );
    it(
      'Should return "Success"' +
        ' when a superAdmin successfully upgrades an ordinary User to an admin',
      done => {
        request(app)
          .put(`/api/v1/users/admin/${2}`)
          .set('x-access-token', superAdminToken)
          .expect(201)
          .then(res => {
            assert.deepEqual(res.status, 201);
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(
              res.body.message,
              'You have been successfully\
           made an admin. Please signin again.'
            );
            done();
          });
      }
    );
    it(
      'Should return "Unsuccessful"' +
        ' when a superAdmin attempts to upgrade another superAdmin',
      done => {
        request(app)
          .put(`/api/v1/users/admin/${1}`)
          .set('x-access-token', superAdminToken)
          .expect(403)
          .then(res => {
            assert.deepEqual(res.status, 403);
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'You are not authorized to perform that action'
            );
            done();
          });
      }
    );
    it(
      'Should return "Unsuccessful"' +
        ' when a superAdmin upgrades a user not existing in the application',
      done => {
        request(app)
          .put(`/api/v1/users/admin/${20}`)
          .set('x-access-token', superAdminToken)
          .expect(404)
          .then(res => {
            assert.deepEqual(res.status, 404);
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(
              res.body.message,
              'Unable to find user, admin creation failed'
            );
            done();
          });
      }
    );
    it(
      'Should return "Success" for signin' + ' when an upgraded user re-log in',
      done => {
        request(app)
          .post('/api/v1/users/login')
          .send({
            email: 'tester@gmail.com',
            password: 'idreeskun'
          })
          .expect(200)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.body.status, 'Success');
            assert.deepEqual(
              res.body.message,
              'Token successfully generated and signin successful'
            );
            assert.deepEqual(res.status, 200);
            adminToken = res.body.data.token;
            done();
          });
      }
    );
    it(
      'Should return "Unsuccessful"' +
        ' when a superAdmin upgrades a user with user role "Admin"',
      done => {
        request(app)
          .put(`/api/v1/users/admin/${2}`)
          .set('x-access-token', superAdminToken)
          .expect(409)
          .then(res => {
            assert.typeOf(res.body, 'object');
            assert.deepEqual(res.status, 409);
            assert.deepEqual(res.body.status, 'Unsuccessful');
            assert.deepEqual(res.body.message, 'User already an Admin');
            done();
          });
      }
    );
  });
});
