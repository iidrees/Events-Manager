import jwt from 'jsonwebtoken';

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
static updateToken(req, res, next) {

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
    })
    .catch(null)
  }
}

export default AdminValidator;