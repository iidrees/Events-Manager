import Sequelize from 'sequelize';
import { Events, Users } from '../models';
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

        return event
          .update({
            isCancelled: true
          })
          .then(newEvent => {
            return Users.findOne({
              where: { id: newEvent.userId }
            })
              .then(user => {
                mailer(user.email, date.startDate, date.center);
                return res.status(201).send({
                  status: 'Success',
                  message: 'This is your cancelled event',
                  newEvent
                });
              })
              .catch(err => console.log('the error from the mail>>', err)); // eslint-disable-line
          })
          .catch(err => {
            return res.status(400).send({
              status: 'Unsuccessful',
              message: 'Event could not be cancelled',
              err: err.message
            });
          });
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
