/* Import modules */
import { Events } from '../models';


/**
 * This is an Event class that allows you POST an event
 */
export class Event {
  /**
 * store an event into the database
 * @static
 * @param {object} req - The request object from user
 * @param {object} res - The response object to user
 * @return {object} the JSON returned to the user
 * @memberof Events
  */
  static postEvents(req, res) {
    // grab values from the req object
    const {
      title,
      description,
      date,
      time,
      centers,
      location,
      type,
      attendance,
      center
    } = req.body;
    const { id } = req.decoded;
    console.log('add events',id);
    /* When user is authenticated, we store data into the database */      
   /*  return Events
      .findOne({ 
        where: {
          userId: id,
        }
      })
      .then((events) => {
        if (events) {
          return res.status(200).send({
            status: 'Fail',
            message: 'Data already taken, please enter another date'
          });
        }
        return res.status(404).send({
          status: 'Fail',
          message: 'Date Not Found'
        })
      })
      .catch(err => res.status(400).send(err.message)); */
    return Events
      .create({
        title,
        description,
        date,
        time,
        centers,
        location,
        type,
        attendance,
        userId: id,
        center
      })
      .then((event) => {
        return res.status(201).send({
          status: 'Success',
          message: 'Event added sucessfully',
          data: event
        });
      })
      .catch((err) => {
        return res.status(400).send({
          status: 'Fail',
          message: err
        })
      });
  }
}
