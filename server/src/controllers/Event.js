/* Import modules */
import moment from 'moment';

import { 
  Events, 
  Centers 
} from '../models';


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
      type,
      imgUrl
    } = req.body;
    const { id } = req.decoded;
    
    return Events /* 
    first check if the center is booked for an
    event for the same date.
     */
      .findAll({
        where:{
          centerId: req.params.centerId,
          date,
        }
      })
      .then((event) => {
        // create the event exists
        if(event.length === 0) {
          return Centers
            .findOne({
              where: {
                id: req.params.centerId,
              }
            })
            .then((venue) => {
              if (!venue) {
                return res.status(404).send({
                  status: 'Unsuccessful',
                  message: 'Center Not Found'
                });
              }
              return Events
                .create({
                  title,
                  description,
                  date,
                  time,
                  center: venue.name,
                  type,
                  imgUrl,
                  userId: id,
                  centerId: venue.id
                })
                .then(newEvent => res.status(201).send({
                  status: 'Success',
                  message: 'Event added successfully',
                  data: newEvent
                }))
                .catch(err => res.status(422).send({
                  status: 'Unsuccessful',
                  message: 'Event could not be added',
                  error: err.errors[0].message
                }));
            });
        }
          return res.status(409).send({
            // find out the correst status code to use here
            status: 'Unsuccessful',
            message: 'date already booked for this center, choose another',
            data: event
            })
         })
        .catch((error) => {
          return res.status(422).send({
            // TODO: find out the correct status code to be used here
            status: 'Unsuccessful',
            message: 'Event could not be added',
            error: error[0].message
        })
      }) 
  }
}

/**
 * This is a EventUpdate class that allows a user
 * update an event he/she created
 * @export
 * @class EventUpdate
 */
export class EventUpdate {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof EventUpdate
   */
  static updateEvent(req, res) {
    const {
      title,
      description,
      date,
      time,
      center,
      type
    } = req.body;
    const { id } = req.decoded;
    const { eventId } = req.params;
    /* Find Events */
    return Events
      .find({
        where: {
          id: parseInt(eventId, 10),
          userId: id
        }
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Event Not Found',
          });
        }
        /* Update recipe if found and return update */
        return event
          .update({
            title: title || event.title,
            description: description || event.description,
            date: date || event.date,
            time: time || event.time,
            center: center || event.center,
            type: type || event.type
          })
          .then(updatedEvent => res.status(200).send({
            status: 'Success',
            message: 'Event updated successfully',
            data: updatedEvent
          }))
          .catch(err => res.send(err.errors[0].message));
      })
      .catch(err => res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please ensure you are entering a value',
        
      }));
  }
}

/**
 * An event class that allows a user
 * delete a recipe he/she added
 * @export
 * @class EventDelete
 */
export class EventDelete {
  /**
   * @static
   * @param {any} req {the request object}
   * @param {any} res {the response object}
   * @returns {*} JSON
   * @memberof EventDelete
   */
  static deleteEvent(req, res) {
    const userId = req.decoded.id;
    return Events
      .findOne({
        where: {
          id: req.params.eventId,
          userId
        },
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Event Not Found'
          });
        }
        return event
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Event Successfully Deleted'
          }))
          .catch(err => res.status(404).send(err));
      })
      .catch(err => res.status(422).send({
        status: 'Unsuccessful',
        message: 'No such event is available',
        
      }));
  }
}

/**
 * This is a GET Event class with a static method getEvents that allows a user
 * get an event they created
 * @export
 * @class GetEvent
 */
export class GetEvent {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {object} JSON
   * @memberof GetEvent
   */
  static getEvent(req, res) {
    return Events
      .findOne({
        where: {
          id: req.params.eventId,
          userId: req.decoded.id
        }
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'No event available, please post an event'
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'This is your event',
          data: event
        });
      })
      .catch(() => res.status(422).send({
        status: 'Unsuccessful',
        message: 'No such event is available'
      }));
  }
}

/**
 * 
 * 
 * @export
 * @class GetAllEvents
 */
export class GetAllEvents {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof GetAllEvents
   */
  static getAllEvents(req, res) {
    if (isNaN(req.query.page)) {
      req.query.page = 1;
    }
    return Events
      .findAll({
        limit: 10,
        offset: (parseInt(req.query.page, 10) - 1 ) * 10, 
        order: [['id', 'DESC']]
      }).then((events) => {
        if (events.length === 0) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'No Event(s) Found'
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'These are your Events',
          data: events
        });
      });
  }
}
