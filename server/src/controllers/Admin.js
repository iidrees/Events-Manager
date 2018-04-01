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
  static addAdmin(req, res) {
    const { id, admin } = req.decoded;
    const { userId } = req.params;
    
    return Users
      .findOne({
        where: {
          id,
        }
      })
      .then(user => {
        if (user.isSuperAdmin === false && user.isAdmin) {
          return res.status(403).send({
            status: 'Unsuccessful',
            message: 'You are unauthorised to carry out this action',
            data: {
              name: user.name,
              email: user.email,
              admin: user.isAdmin,
              role: user.role,
              superAdmin: user.isSuperAdmin
            }
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
            name: updateUser.name,
            email: updateUser.email,
            admin: updateUser.isAdmin,
            role: updateUser.role,
            superAdmin: updateUser.isSuperAdmin
          }
        }))
        .catch(() => res.status(400).send({
          status: 'Unsuccessful',
          message: 'Admin creation failed'
        }))})
      .catch(err => res.status(404).send({
        status: 'Unsuccessful',
        message: 'Unable to find user, admin creation failed',
        error: err.message
      }));
  }
}
