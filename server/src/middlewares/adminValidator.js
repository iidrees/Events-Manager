/* Import modules */
import { Users } from '../models';


/**
 * 
 * 
 * @class AdminValidator
 */
class AdminValidator {
/**
 * 
 * 
 * @static
 * @param {any} req request object
 * @param {any} res response object
 * @param {next} next calls next middleware
 * @returns {JSON} object
 * @memberof AdminValidator
 */
static updateUser(req, res, next) {

  /* Using the UserId from the token
  check find the user from the user table 
  and then check if they are still an admin */
  return Users
    .findOne({
      where: {
        id: parseInt(req.decoded.id, 10)
      }
    })
    .then((user) => {
      if ( user.isAdmin !== true ) {
        return res.status(403).send({
          status: 'Unsuccessful',
          message: 'You are unauthorised to carry out this action'
        })
      }
      next();
      return null
    })
    .catch(() => {
      return res.status(400).send({
        message: 'bad request',
        status: 'Unsuccessful' 
      })
    })
  }
}

export default AdminValidator;