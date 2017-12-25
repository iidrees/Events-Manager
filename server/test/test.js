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
let newToken;
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
        });
    });
  });
});
/* TESTING SIGNUP AND SIGNIN ENDPOINTS */
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
        });
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
        });
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
        });
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
          assert.deepEqual(res.body.message, 'You are signed up successfully.');
          assert.deepEqual(res.body.name, 'tester');
          assert.deepEqual(res.body.id, 1);
          assert.deepEqual(res.status, 201);
          token = res.body.data.token;

          done();
        });
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
        });
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
        });
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
        });
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
        });
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
        });        
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
        });
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
          newToken = res.body.data;
          done();
        });
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
          assert.deepEqual(res.body.message, 'Incorrect Login Credentials');
          assert.deepEqual(res.status, 403);
          done();
        });
    });
  });
});

describe('TEST FOR ADMIN', () => {
  describe('Test creation of an admin', () => {
    it('Should return "Success" for successful admin creation', (done) => {
      request(app)
        .put(`/api/v1/users/admin/${1}`)
        .set('x-access-token', token)
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'You have been successfully made an admin. Please signin again.');
          assert.deepEqual(res.body.data.name, 'tester');
          assert.deepEqual(res.body.data.email, 'tester@gmail.com');
          done();
        });
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
          adminToken = res.body.data.token;
          done();
        });
    });
  });
});

/* TESCT FOR NONE AVAILABLE CENTERS */
describe('TEST FOR NONE AVAILABLE CENTERS', () => {
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
      .catch(err => done(err))
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
      })
      .expect(201)
      .then((res) => {
        assert.deepEqual(res.status, 201);
        assert.deepEqual(res.body.status, 'Success');
        assert.deepEqual(res.body.message, 'Center Added Successfully');
        done();
      });
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
      });
  });
});
/* TEST FOR MODIFY/EDIT/PUT CENTERS */
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
      })
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.status, 400);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Please input correct value');
        done();
      });
  });
});


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
          type: 'Public',
          attendance: '200',
        })
        .expect(401)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Unauthorized');
          assert.deepEqual(res.status, 401);
          done();
        });
    });
    it('should return "Unsuccessful" for wrong credentials', (done) => {
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
          time: '12-03 PM',
          center: 'Club House',
          type: 'public'
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
          date: '2018-03-02',
          time: '12-03 PM',
          type: 'public'
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
          assert.deepEqual(res.body.data.center, 'Muson Center');
          assert.deepEqual(res.body.data.type, 'public');
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
          date: '2018-03-02',
          time: '12-03 PM',
          center: 'Muson Center',
          type: 'public'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Date already booked, enter another date');
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
          time: '12-03 PM',
          center: 'Muson Center',
          type: 'public',
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'Please enter a description');
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
          time: '12-03 PM',
          center: 'Muson Center',
          type: 'public',
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
          time: '12-03 PM',
          center: 'Muson Center',
          type: 'public',
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
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
          time: '12-03 PM',
          center: 'Lagos Lagoon',
          type: 'public',
        })
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.message, 'Event updated successfully');
          assert.deepEqual(res.body.data.title, 'Felabration');
          assert.deepEqual(res.body.data.description, 'It not fela anymore anymore oo');
          assert.deepEqual(res.body.data.date, '2018-03-08');
          assert.deepEqual(res.body.data.time, '12-03 PM');
          assert.deepEqual(res.body.data.center, 'Lagos Lagoon');
          assert.deepEqual(res.body.data.type, 'public');
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
          type: 'public',
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
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.status, 400);
          assert.deepEqual(res.body.status, 'Unsuccessful');
          assert.deepEqual(res.body.message, 'No such event is available');
          done();
        });
    });
  });
});


describe('TEST FOR AVAILABILITY OF CENTERS', () => {
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
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.status, 400);
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
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.status, 400);
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
      .expect(400)
      .then((res) => {
        assert.deepEqual(res.status, 400);
        assert.deepEqual(res.body.status, 'Unsuccessful');
        assert.deepEqual(res.body.message, 'Unable to delete center, please try again later');
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
