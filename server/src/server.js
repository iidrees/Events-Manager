/* import modules */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import auth from './auth/auth';
import { UserSignup, UserSignin } from './controllers/users';
import { Event, EventUpdate, EventDelete } from './controllers/events';
import Admin from './controllers/admin';
import Center from './controllers/AddCenters';
import EditCenter from './controllers/editCenter';


/* initialise App and set PORT */
const app = express();
const port = process.env.PORT || 5050;

// configured the dotenv command to enable storage in the environment
dotenv.config();

// Morgan to log requests to the console
app.use(logger('dev'));

// set up body-parser to grab incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


// route
app.get('/home', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Events Manager API' });
});


app.post('/api/v1/users', UserSignup.signUp);
app.post('/api/v1/users/login', UserSignin.signIn);

// jwt middleware to verify users trying to hit secure endpoints
app.use(auth.verifyUser);
app.post('/api/v1/events', Event.postEvents);
app.put('/api/v1/events/:eventId', EventUpdate.updateEvent);
app.delete('/api/v1/events/:eventId', EventDelete.deleteEvent);
app.post('/api/v1/users/admin', Admin.addAdmin);
app.post('/api/v1/centers', Center.addCenter);
app.put('/api/v1/centers/:centerId', EditCenter.editCenter);


// start application
app.listen(port);

export default app;
