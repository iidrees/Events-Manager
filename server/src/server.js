/* import modules */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';


/* initialise App and set PORT */
const app = express();
const port = process.env.PORT || 5050;

// Morgan to log requests to the console
app.use(logger('dev'));

// set up body-parser to grab incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


// route
app.get('/home/', (req, res) => {
  res.status(200).send({ message: 'Locked and Loaded' });
});

// start application
app.listen(port, () => {
  console.log(`we are live on port ${port}`);
});

export default app;