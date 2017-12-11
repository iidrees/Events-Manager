import { Users } from '../models';


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


    if (admin === true) {
      return res.status(403).send({
        status: 'Unsuccessful',
        message: 'You are already an admin. Please signin again.'
      });
    }
    return Users
      .findOne({
        where: {
          id,
          isAdmin: admin,
        }
      })
      .then(user => user
        .update({
          isAdmin: true,
        })
        .then(updateUser => res.status(201).send({
          status: 'Success',
          message: 'You have been successfully made an admin. Please signin again.',
          data: {
            name: updateUser.name,
            email: updateUser.email,
            admin: updateUser.isAdmin
          }
        }))
        .catch(() => res.status(400).send({
          status: 'Unsuccessful',
          message: 'Admin creation failed'
        })))
      .catch(err => err.message);
  }
}
