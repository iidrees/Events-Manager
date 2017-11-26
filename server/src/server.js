/* import modules */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerJSDOC from 'swagger-jsdoc';
import router from './routes/routes';


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
// Catch all default route
app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Resource Not Found'
  });
});

// router to the API
app.use('/api/v1/', router);


// start application
app.listen(port);

export default app;
