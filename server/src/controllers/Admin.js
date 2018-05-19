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
 * @param {any} req {request object}
 * @param {any} res {response object}
 * @returns {*} any
 * @memberof Admin
 */
  static upgradeUserRole(req, res) {
    const { id, admin, isSuperAdmin } = req.decoded;
    const { userId } = req.params;
    if (isSuperAdmin === false) {
      return res.status(403).send({
        status: 'Unsuccessful',
        message: 'You are unauthorised to carry out this action'
      })
    }
    return Users
      .findOne({
        where: {
          id: userId,
        }
      })
      .then(user => {

        if (user.isSuperAdmin === true) {
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'You are not authorized to perform that action'
          })
        }

        if (user.isAdmin === true) {
          return res.status(409).send({
            status: 'Unsuccessful',
            message: 'User already an Admin'
          })
        }
        return user
        .update({
          isAdmin: true,
          role: 'Admin'
        })
        .then(updateUser => res.status(201).send({
          status: 'Success',
          message: 'You have been successfully\
           made an admin. Please signin again.',
          data: {
            role: updateUser.role,
          }
        }))
        .catch(() => res.status(422).send({
          status: 'Unsuccessful',
          message: 'Admin creation failed'
        }))
      })
      .catch(err => res.status(404).send({
        status: 'Unsuccessful',
        message: 'Unable to find user, admin creation failed',
        error: err.message
      }));
  }
}
