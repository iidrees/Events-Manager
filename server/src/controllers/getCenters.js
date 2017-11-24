import { Centers, Events } from '../models';

/**
 * A class that allows all users get a centers
 * and then see all events slated for that event center
 * @export
 * @class GetCenter
 */
export class GetCenter {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {*} JSON
   * @memberof GetCenter
   */
  static getCenter(req, res) {
    const { centerId } = req.params;
    return Centers
      .findOne({
        where: {
          id: centerId,
        },
        include: [
          {
            model: Events,
            as: 'events'
          }
        ]
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Center Not Found'
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'These are the event centers',
          data: center
        });
      })
      .catch(err => res.status(400).send({
        status: 'Unsuccessful',
        data: err.message
      }));
  }
}

/**
 * This is a class that allows all users to see all event centers
 *
 * @export
 * @class GetAllCenters
 */
export class GetAllCenters {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {*} JSON
   * @memberof GetAllCenters
   */
  static getAllCenters(req, res) {
    return Centers
      .findAll({}).then((centers) => {
        if (centers.length === 0) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'No Centers Found'
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Centers found',
          data: centers
        });
      })
      .catch(err => res.status(400).send({
        status: 'Unsuccessful',
        message: err.message
      }));
  }
}
