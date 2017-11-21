import { Centers } from '../models';

/**
 * A class to allow an authenticated user
 * who is also an admin add a center
 * @export
 * @class Center
 */
export default class Center {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {*} any
   * @memberof Center
   */
  static addCenter(req, res) {
    const {
      name,
      location,
      address,
      owner,
      capacity,
      description
    } = req.body;
    const { id } = req.decoded;

    return Centers
      .create({
        name,
        location,
        address,
        owner,
        capacity,
        description,
        userId: id
      })
      .then(center => res.status(201).send({
        status: 'Success',
        message: 'Center Added Successfully',
        data: center
      }))
      .catch(err => res.status(400).send({
        status: 'Unsuccessful',
        message: 'Center Could not be added',
        data: err.message
      }));
  }
}
