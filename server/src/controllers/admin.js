import { Users } from '../models';
import { isBoolean } from 'util';

/**
 * A class to help to help give users 
 * admin priviledges
 * @export
 * @class Admin
 */
export default class Admin {
/**
 * @static
 * @param {any} req 
 * @param {any} res 
 * @returns {*} any
 * @memberof Admin
 */
  static addAdmin(req, res) {
    const { id, admin } = req.decoded;
    const { bool } = req.params;

    if (admin === true) {
      return res.status(200).send({
        status: 'Unsuccessful',
        message: 'You are already an admin'
      });
    }
    return Users
      .findOne({
        where: {
          id,
          isAdmin: admin,
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'User Not Found'
          });
        }
        return user
          .update({
            isAdmin: bool,
          })
          .then(updateUser => res.status(200).send({
            status: 'Success',
            message: 'You have been successfully made an Admin',
            data: updateUser
          }))
          .catch(err => res.status(400).send({
            status: 'Unsuccessful',
            message: 'Admin creation failed'
          }));
      })
      .catch(err => err.message);
  }
}