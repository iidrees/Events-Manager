/* import modules */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import path from 'path';
import config from '../../webpack.config';
import router from './routes/routes';



/* initialise App and set PORT */
const app = express();
const compiler = webpack(config);
app.use(cors({credentials: true, origin: true}));

// configured the dotenv command to enable storage in the environment
dotenv.config();

// Morgan to log requests to the console
app.use(logger('dev'));

// set up body-parser to grab incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

/* checks if environment is development when testing so bundle is not 
generated each time test is run */
if (process.env.NODE_ENV !== 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    noInfo: false,
    publicPath: config.output.publicPath
  }))  
}



// route
app.get('/home', (req, res) => {
  res.status(200).send({ message: 'Welcome to the Events Manager API' });
});

// router to the API
app.use('/api/v1/', router);

/* The "catchall" handler: for any request that points to react app
match one above, send back React's index.html file.
 */
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
  
});

// a catch all route for route not matched
app.all('*', (req, res) => {
  res.status(404).send({
    status: 'Unsuccessful',
    message: 'Page Not Found'
  })
})

// set port 
const port = process.env.PORT || 5050;

// start application
app.listen(port);

export default app;
