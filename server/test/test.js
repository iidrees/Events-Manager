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
let adminToken;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';
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

describe('Sign-up and Sign-in Endpoints', () => {
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
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
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Incorrect login details supplied');
          assert.deepEqual(res.status, 403);
          done();
        })
        .catch(err => done(err));
    });
  });
});

describe('TEST EVENT ENDPOINTS', () => {
  /* TESTS FOR EVENTS */
  describe('Test POST "/api/v1/events"', () => {
    it('should return "Unauthorized" for wrong credentials', (done) => {
      request(app)
        .post('/api/v1/events')
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12:03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'Public',
          attendance: '200',
          userId: 1
        })
        .expect(401)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Unauthorized');
          assert.deepEqual(res.status, 401);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Unsuccessful" for wrong credentials', (done) => {
      request(app)
        .post('/api/v1/events')
        .set('x-access-token', expiredToken)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12:03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'Public',
          attendance: '200',
          userId: 1
        })
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Session Expired, Please signin again.');
          assert.deepEqual(res.status, 403);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Success" for creating an event', (done) => {
      request(app)
        .post('/api/v1/events')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12-03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: '200'
        })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Event added successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(res.body.data.description, 'Its an event for fela abeg');
          assert.deepEqual(res.body.data.date, '2018-03-02');
          assert.deepEqual(res.body.data.time, '12-03 PM');
          assert.deepEqual(res.body.data.venue, 'Lagos Lagoon');
          assert.deepEqual(res.body.data.location, 'The Shrine');
          assert.deepEqual(res.body.data.type, 'public');
          assert.deepEqual(res.body.data.attendance, 200);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Date already booked, enter another date" for unique data validation', (done) => {
      request(app)
        .post('/api/v1/events')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'Its an event for fela abeg',
          date: '2018-03-02',
          time: '12-03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: '200'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Date already booked, enter another date');
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Date already booked, enter another date" for unique data validation', (done) => {
      request(app)
        .post('/api/v1/events')
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: '',
          date: '2018-03-08',
          time: '12-03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: '200'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Validation error: Please enter a description');
          done();
        })
        .catch(err => done(err));
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
          time: '12-03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: '200'
        })
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.message, 'Event Not Found');
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Event updated successfully" if event found and updated', (done) => {
      request(app)
        .put(`/api/v1/events/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Felabration',
          description: 'It not fela anymore anymore oo',
          date: '2018-03-08',
          time: '12-03 PM',
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: 200
        })
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.message, 'Event updated successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(res.body.data.description, 'It not fela anymore anymore oo');
          assert.deepEqual(res.body.data.date, '2018-03-08');
          assert.deepEqual(res.body.data.time, '12-03 PM');
          assert.deepEqual(res.body.data.venue, 'Lagos Lagoon');
          assert.deepEqual(res.body.data.location, 'The Shrine');
          assert.deepEqual(res.body.data.type, 'public');
          assert.deepEqual(res.body.data.attendance, 200);
          done();
        })
        .catch(err => done(err));
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
          venue: 'Lagos Lagoon',
          location: 'The Shrine',
          type: 'public',
          attendance: 200
        })
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.message, 'Session Expired, Please signin again.');
          done();
        })
        .catch(err => done(err));
    });
  });
});

describe('TEST FOR ADMIN', () => {
  describe('Test creation of an admin', () => {
    it('Should return "Success" for successful admin creation', (done) => {
      request(app)
        .post('/api/v1/users/admin')
        .set('x-access-token', token)
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'You have been successfully made an admin. Please signin again.');
          assert.deepEqual(res.body.data.name, 'tester');
          assert.deepEqual(res.body.data.email, 'tester@gmail.com');
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Success" for signin', (done) => {
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
          adminToken = res.body.data;
          done();
        })
        .catch(err => done(err));
    });
    it('Should return "Unsuccessful" for unsuccessful admin creation request', (done) => {
      request(app)
        .post('/api/v1/users/admin')
        .set('x-access-token', adminToken)
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.status, 403);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'You are already an admin. Please signin again.');
          done();
        })
        .catch(err => done(err));
    });
  });
});
/* TEST POST CENTER */
describe('TEST add centers', () => {
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
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'You are not permitted to create a center');
        done();
      })
      .catch(err => done(err));
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
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.status, 201);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center Added Successfully');
        done();
      })
      .catch(err => done(err));
  });
  it('should return an error for wrong input by an admin', (done) => {
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
      })
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.status, 400);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Center Could not be added');
        done();
      })
      .catch(err => done(err));
  });
});

describe('TEST PUT/ edit centers endpoint', () => {
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
      })
      .expect(403)
      .then((res) => {
        assert.deepEqual(res.status, 403);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'You are not permitted to edit or modify this event center');
        done();
      })
      .catch(err => done(err));
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
      })
      .expect(404)
      .then((res) => {
        assert.deepEqual(res.status, 404);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Center Not Found');
        done();
      })
      .catch(err => done(err));
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
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.status, 201);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center successfully updated');
        done();
      })
      .catch(err => done(err));
  });
});
