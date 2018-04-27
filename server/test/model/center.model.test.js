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
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity Mall',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Model-man',
        capacity: 250000,
        location: 'Sanfrancisco, Bay Area',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      }).then(center => {
        assert.property(center.dataValues, 'name');
        assert.property(center.dataValues, 'description');
        assert.property(center.dataValues, 'status');
        assert.property(center.dataValues, 'imgUrl');
        assert.property(center.dataValues, 'owner');
        assert.property(center.dataValues, 'location');
        assert.property(center.dataValues, 'address');
        assert.property(center.dataValues, 'userId');
        assert.property(center.dataValues, 'capacity');
        done();
      });
    });

    it('should check validation on name input, name cannot be null', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Model-man',
        capacity: 250000,
        location: 'Sanfrancisco, Bay Area',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Centers.name cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });

    it('should check validation on name input, name cannot be empty', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: '',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Model-man',
        capacity: 250000,
        location: 'Sanfrancisco, Bay Area',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a CENTER NAME in the input field'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on location, location input cannot be null', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Model-man',
        capacity: 250000,
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Centers.location cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });

    it('should check validation on location, location input cannot be empty', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Model-man',
        capacity: 250000,
        location: '',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a Location i.e a state where the center is located'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on owner, owner input cannot be null', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        capacity: 250000,
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Centers.owner cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });

    it('should check validation on owner, owner input cannot be empty', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: '',
        capacity: 250000,
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter enter the name of the owner'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on capacity, capacity input cannot be null', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          //console.log('owner >>>>', error);
          assert.deepEqual(
            error.errors[0].message,
            'Centers.capacity cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });
    it('should check validation on capacity, capacity input cannot be empty', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        capacity: '',
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter the capacity of the Center'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on capacity, capacity input must be numeric', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        capacity: 'string',
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter the Capacity in numbers'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on capacity, capacity input must be numeric', done => {
      Centers.create({
        description: 'The Amityttiy Hall',
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        capacity: 'string',
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter the Capacity in numbers'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });

    it('should check validation on description, description input cannot be null', done => {
      Centers.create({
        name: 'Amity-kun',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        capacity: 4545454,
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Centers.description cannot be null'
          );
          assert.deepEqual(error.errors[0].type, 'notNull Violation');
          done();
        });
    });

    it('should check validation on description, description input cannot be empty', done => {
      Centers.create({
        name: 'Amity-kun',
        description: '',
        imgUrl: 'this is just a placeholder for images',
        owner: 'Baba-cass',
        capacity: 4545454,
        location: 'Abuka',
        address: 'Lekki, phase 2 Eti Osa Lagos State',
        userId: 1
      })
        .then(() => {
          done();
        })
        .catch(error => {
          assert.deepEqual(
            error.errors[0].message,
            'Please enter a description of what the center looks like'
          );
          assert.deepEqual(error.errors[0].type, 'Validation error');
          done();
        });
    });
  });
});
