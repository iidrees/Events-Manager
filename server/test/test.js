import { assert } from 'chai';
import request from 'supertest';
import app from '../src/server';


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
