import { assert } from 'chai';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../src/server';
import { Users, Events, Centers } from '../../src/models';
import { users, seedUser } from '../testHelpers/testSeed';

let id;
let email;
let name;
let isAdmin;
let isSuperAdmin;
let role;
describe('TEST MODEL', () => {
  describe('USER', () => {
    before(done => {
      Users.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
      }).then(() => {
        seedUser();
        done();
      });
    });

    it('should successfully create a new user in the database', done => {
      Users.create({
        name: 'Idrees',
        email: 'idreeskun@kun.com',
        password: bcrypt.hashSync('password', 10)
      }).then(user => {
        name = user.dataValues.name;
        id = user.dataValues.id;
        email = user.dataValues.email;
        isAdmin = user.dataValues.isAdmin;
        isSuperAdmin = user.dataValues.isSuperAdmin;
        role = user.dataValues.role;

        assert.property(user.dataValues, 'id');
        assert.property(user.dataValues, 'name');
        assert.property(user.dataValues, 'email');
        assert.property(user.dataValues, 'password');
        assert.property(user.dataValues, 'isAdmin');
        assert.property(user.dataValues, 'isSuperAdmin');
        assert.property(user.dataValues, 'role');
        assert.property(user.dataValues, 'createdAt');
        assert.property(user.dataValues, 'updatedAt');

        done();
      });
    });

    it('should return a allowNull validation error for no name entered', done => {
      Users.create({
        name: null,
        email: 'tester@test.com',
        password: bcrypt.hashSync('password', 10)
      })
        .then(user => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Users.name cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });

    it('should return "This name already exists" for unique name validation', done => {
      Users.create({
        name: 'test',
        email: 't@t.com',
        password: bcrypt.hashSync('password', 10)
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'This name already exist, enter a new name'
          );
          done();
        });
    });

    it('should return "Please enter a valid email address" for email validation', done => {
      Users.create({
        name: 'testeeeeeee',
        email: 'email.mail.com',
        password: bcrypt.hashSync('password', 10)
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a valid email address'
          );
          done();
        });
    });
    it('should return "Your email must be in lowercase" for email validation', done => {
      Users.create({
        name: 'testeeeeeee',
        email: 'EMAIL@mail.com',
        password: bcrypt.hashSync('password', 10)
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Your email must be in lowercase'
          );
          done();
        });
    });

    it('should return "Users.password cannot be null" for password validation', done => {
      Users.create({
        name: 'offsite',
        email: 'teeeee@t.com'
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Users.password cannot be null'
          );

          done();
        });
    });
  });
});
