import Sequelize from 'sequelize';
import { Events } from '../models';
import mailer from '../config/mailer';

const Op = Sequelize.Op;
/**
 *
 *
 * @export
 * @class CancelEvent
 */
export default class CancelEvent {
  /**
   * @static
   * @param {any} req -
   * @param {any} res -
   * @returns {void}
   * @memberof CancelEvent
   */
  static cancelEvent(req, res) {
    const { eventId } = req.params;

    return Events.findOne({
      where: {
        id: eventId
      }
    })
      .then(event => {
        const date = event;
        if (!event) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'No event found',
            event
          });
        }
        if (event.isCancelled === true) {
          return res.status(409).send({
            status: 'Unsuccessful',
            message: 'Event already cancelled',
            event
          });
        }
        mailer(date.startDate, date.center);
        return event
          .update({
            startDate: null,
            endDate: null,
            isCancelled: true
          })
          .then(newEvent => {
            return res.status(201).send({
              status: 'Success',
              message: 'This is your cancelled event',
              newEvent
            });
          })
          .catch(err => {
            return res.status(400).send({
              status: 'Unsuccessful',
              message: 'Event could not be cancelled',
              err: err.message
            });
          });

        // return res.status(200).send({
        //   status: 'Unsuccessful',
        //   message: 'This is the event you are looking for',
        //   event
        // });
      })
      .catch(err => {
        return res.status(400).send({
          status: 'Unsuccessful',
          message: 'there was an error',
          err
        });
      });
  }
}
