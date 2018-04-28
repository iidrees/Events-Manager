import validator from 'validator';

import { 
  Centers, 
  Events 
} from '../models';

/**
 * A class that allows all users get a centers
 * and then see all events slated for that event center
 * @export
 * @class GetCenter
 */
export class GetCenter {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @return {*} JSON
   * @memberof GetCenter
   */
  static getCenter(req, res) {
    const { centerId } = req.params;
    return Centers
      .findOne({
        where: {
          id: centerId,
        }
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
      .catch(err => res.status(422).send({
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
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof GetAllCenters
   */
  static getAllCenters(req, res) {
    if (isNaN(req.query.page)) {
      req.query.page = 1;
    }
    return Centers
      .findAll({
        limit: 10,
        offset: (parseInt(req.query.page, 10) - 1 ) * 10, 
        order: [['id', 'ASC']]
      }).then((centers) => {
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
      });
  }
}

/**
 *
 * @export
 * @class CenterDelete
 */
export class CenterDelete {
  /**
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof CenterDelete
   */
  static deleteCenter(req, res) {
    const userId = req.decoded.id;
    const id = req.params.centerId;
    if (req.decoded.admin === false) {
      return res.status(403).send({
        status: 'Unsuccessful',
        message: 'You are not permitted to delete this event center'
      });
    }
    if (!validator.isInt(id)) {
      // checking if the capacity is an integer
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'CenterId must be a number'
      })
    }
    return Centers
      .findOne({
        where: {
          id,
          userId
        },
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Center Not Found'
          });
        }
        return center
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Center Successfuly Deleted'
          }))
          .catch(err => res.status(500).send({
            status: 'Unsuccessful',
            message: 'Unable to delete center'
          }));
      })
      .catch(err => res.status(422).send({
        status: 'Unsuccessful',
        message: 'Unable to delete center, please try again later',
        data: err
      }));
  }
}
