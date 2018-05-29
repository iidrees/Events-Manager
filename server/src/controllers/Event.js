/* Import modules */
import moment from 'moment';
import Sequelize from 'sequelize';

import { Events, Centers } from '../models';

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
    const { title, description, startDate, endDate, time, imgUrl } = req.body;
    const { id } = req.decoded;
    if (startDate <= new Date().toISOString().slice(0, 10)) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message:
          'Invalid date entered, please enter a date from the current date',
        startDate
      });
    }

    const Op = Sequelize.Op;
    return Events /* 
    first check if the center is booked for an
    event for the same date.
     */.findAll(
      {
        where: {
          centerId: req.params.centerId,
          [Op.or]: [
            {
              startDate: {
                [Op.between]: [req.body.startDate, req.body.endDate]
              },
              endDate: {
                [Op.between]: [req.body.startDate, req.body.endDate]
              }
            },
            {
              startDate: {
                [Op.lte]: req.body.startDate
              },
              endDate: {
                [Op.gte]: req.body.endDate
              }
            }
          ]
        }
      }
    )
      .then(event => {
        // create the event exists
        if (!event || event.length === 0) {
          return Centers.findOne({
            where: {
              id: req.params.centerId
            }
          }).then(venue => {
            if (!venue) {
              return res.status(404).send({
                status: 'Unsuccessful',
                message: 'Center Not Found'
              });
            }
            return Events.create({
              title,
              description,
              startDate,
              endDate,
              center: venue.name,
              imgUrl,
              userId: id,
              centerId: venue.id
            })
              .then(newEvent =>
                res.status(201).send({
                  status: 'Success',
                  message: 'Event added successfully',
                  data: newEvent
                })
              )
              .catch(err =>
                res.status(422).send({
                  status: 'Unsuccessful',
                  message: 'Event could not be added',
                  error: err.errors[0].message
                })
              );
          });
        }
        return res.status(409).send({
          // find out the correst status code to use here
          status: 'Unsuccessful',
          message: 'date already booked for this center, choose another',
          data: event
        });
      })
      .catch(error => {
        return res.status(400).send({
          // TODO: find out the correct status code to be used here
          status: 'Unsuccessful',
          message:
            'Please ensure you are entering the centerId as an integer in the req.params',
          error
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
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof EventUpdate
   */
  static updateEvent(req, res) {
    const { title, description, startDate, center, endDate, imgUrl } = req.body;

    const { id } = req.decoded;
    const { eventId } = req.params;

    /**
     * Check if date is a time in the past and returns an error if true
     *  */
    if (startDate <= new Date().toISOString().slice(0, 10)) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message:
          'Your start and/or end date cannot be dates in the past, please enter a valid start date',
        startDate
      });
    }

    /* Find Events */
    return Events.findOne({
      where: {
        id: parseInt(eventId, 10)
      }
    })
      .then(event => {
        if (!event) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Event Not Found'
          });
        }
        if (event.userId !== id) {
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'you are not authorized to perform this action'
          });
        }
        if (startDate && endDate) {
          const Op = Sequelize.Op;

          return Events.findOne({
            where: {
              centerId: event.centerId,
              [Op.or]: [
                {
                  startDate: {
                    [Op.between]: [req.body.startDate, req.body.endDate]
                  },
                  endDate: {
                    [Op.between]: [req.body.startDate, req.body.endDate]
                  }
                },
                {
                  startDate: {
                    [Op.lte]: req.body.startDate
                  },
                  endDate: {
                    [Op.gte]: req.body.endDate
                  }
                }
              ]
            }
          })
            .then(dateEvent => {
              if (!dateEvent || dateEvent.id === event.id) {
                return Centers.findOne({
                  where: {
                    name: center
                  }
                }).then(venue => {
                  if (!venue) {
                    return res.status(404).send({
                      status: 'Unsuccessful',
                      message: 'Center Not Found'
                    });
                  }
                  return event
                    .update({
                      title: title || event.title,
                      description: description || event.description,
                      startDate: startDate || event.startDate,
                      endDate: endDate || event.endDate,
                      center: venue.name || event.center,
                      imgUrl: imgUrl || event.imgUrl,
                      centerId: venue.id || event.centerId
                    })
                    .then(updatedEvent =>
                      res.status(201).send({
                        status: 'Success',
                        message: 'Event updated successfully',
                        data: updatedEvent
                      })
                    )
                    .catch(err =>
                      res.status(422).send({
                        status: 'Unsuccessful',
                        message:
                          'Event cannot be updated, please check your inputs',
                        error: err.errors[0].message
                      })
                    );
                });
              }
            })
            .catch(err => {
              return res.status(422).send({
                status: 'Unsuccessful',
                message: err.message
              });
            });
        }
      })
      .catch(err =>
        res.status(422).send({
          status: 'Unsuccessful',
          message: 'Please ensure you are entering a value'
        })
      );
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
    let eventId;
    return Events.findOne({
      where: {
        id: req.params.eventId
      }
    })
      .then(event => {
        if (event.userId !== userId) {
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'You are unauthorised from performing this action'
          });
        }
        eventId = event.id;
        return event.destroy().then(() =>
          res.status(200).send({
            status: 'Success',
            message: 'Event Successfully Deleted',
            eventId
          })
        );
      })
      .catch(err =>
        res.status(404).send({
          status: 'Unsuccessful',
          message: 'No such event is available'
        })
      );
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
    return Events.findOne({
      where: {
        id: req.params.eventId
      }
    })
      .then(event => {
        if (event.userId !== req.decoded.id) {
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'You are not authorized to carry out this action'
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'This is your event',
          data: event
        });
      })
      .catch(() =>
        res.status(404).send({
          status: 'Unsuccessful',
          message: 'No such event is available'
        })
      );
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
    return Events.findAndCountAll({
      limit: 10,
      offset: (parseInt(req.query.page, 10) - 1) * 10,
      order: [['id', 'ASC']]
    }).then(events => {
      if (events.rows.length === 0) {
        return res.status(404).send({
          status: 'Unsuccessful',
          message: 'No Event(s) Found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'These are all Events',
        data: events
      });
    });
  }
}

/**
 *
 *
 * @export
 * @class GetAllUsersEvents
 */
export class AllUsersEvents {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof GetAllUsersEvents
   */
  static getAllUserEvents(req, res) {
    if (isNaN(req.query.page)) {
      req.query.page = 1;
    }
    return Events.findAndCountAll({
      limit: 10,
      offset: (parseInt(req.query.page, 10) - 1) * 10,
      order: [['id', 'ASC']],
      where: {
        userId: req.decoded.id
      }
    }).then(events => {
      if (events.rows.length === 0) {
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
