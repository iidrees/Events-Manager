import { assert } from 'chai';
import bcrypt from 'bcrypt';
import { Users, Events, Centers } from '../../src/models';
import { users, seedUser, seedCenter } from '../testHelpers/testSeed';

describe('TEST MODEL', () => {
  describe('TEST CENTERS', () => {
    before(done => {
      Centers.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      }).then(() => {
        done();
      });
    });

    it('should successfully create a new center', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '2018-07-01',
        center: 'The Blue Center',
        imgUrl: 'Image baba',
        userId: 1
      }).then(event => {
        assert.property(event.dataValues, 'title');
        assert.property(event.dataValues, 'description');
        assert.property(event.dataValues, 'date');
        assert.property(event.dataValues, 'center');
        assert.property(event.dataValues, 'imgUrl');
        done();
      });
    });

    it('should check validation on title, title should not be empty', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '2018-07-02',
        center: 'The Blue Center',
        imgUrl: 'Image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please your events name cannot be empty'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on description, description should not be empty', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: '',
        date: '2018-07-03',
        center: 'The Blue Center',
        imgUrl: 'Image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a description'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on center, center should not be empty', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '2018-07-04',
        center: '',
        imgUrl: 'Image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(error.errors[0].message, 'Please enter a center');
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on imgUrl, imgUrl should not be empty', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '2018-07-06',
        center: 'Image is required',
        imgUrl: '',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(error.errors[0].message, 'Image is required');
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on date, date should be unique', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '2018-07-06',
        center: 'ImageAss center',
        imgUrl: 'image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Date already booked, enter another date'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on date, date should not be empty', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: '',
        center: 'ImageAss center',
        imgUrl: 'image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(error.errors[0].message, 'Please enter a date');
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on date, date input should be a date', done => {
      Events.create({
        title: 'The Avangers Infinity War AFter PArry',
        description: 'THe party of the century',
        date: 'yeasjfhaskjhfjas',
        center: 'ImageAss center',
        imgUrl: 'image baba',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a valid date'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });
  });
});
