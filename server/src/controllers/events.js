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
      venue,
      location,
      type,
      attendance,
    } = req.body;
    const { id } = req.decoded;
    console.log('add events', id);
    return Events
      .create({
        title,
        description,
        date,
        time,
        venue,
        location,
        type,
        attendance,
        userId: id
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
        });
      });
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
   * @param {any} req
   * @param {any} res
   * @returns {*} JSON
   * @memberof EventUpdate
   */
  static updateEvent(req, res) {
    const {
      title,
      description,
      date,
      time,
      venue,
      location,
      type,
      attendance
    } = req.body;
    const { id } = req.decoded;
    const { eventId } = req.params;
    console.log('this is the event ID', eventId);
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
          return res.status(401).send({
            status: 'Fail',
            message: 'Event Not Found',
            data: event
          });
        }
        /* Update recipe if found and return update */
        return event
          .update({
            title: title || event.title,
            description: description || event.description,
            date: date || event.date,
            time: time || event.time,
            venue: venue || event.venue,
            location: location || event.location,
            type: type || event.type,
            attendance: attendance || event.attendance,
          })
          .then(updatedEvent => res.status(200).send({
            status: 'Success',
            message: 'Event updated successfully',
            data: updatedEvent
          }))
          .catch(err => res.send(err.message));
      })
      .catch(err => res.status(400).send({
        status: 'Fail',
        message: 'Please ensure you are entring a value',
        data: err
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
   * @param {any} req
   * @param {any} res
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
            status: 'Fail',
            message: 'Event Not Found'
          });
        }
        return event
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Event Successfuly Deleted'
          }))
          .catch(err => res.status(404).send(err));
      })
      .catch(err => res.status(404).send({
        status: 'Fail',
        message: 'Not deleting',
        data: err
      }));
  }
}
