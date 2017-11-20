/* import modules */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


/* initialise App */

const app = express();
const port = process.env.PORT || 5050;

app.get('/home/', (req, res) => {
  res.status(200).send({ message: 'Locked and Loaded' });
});

app.listen(port, () => {
//  console.log(`we are live on port ${port}`);
});
