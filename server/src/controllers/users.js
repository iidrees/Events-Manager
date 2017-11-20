// import dependencies
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { Users } from '../models';

/**
 * This is a UserSignup class that allows a User to sign-up
 * @export
 * @class UserSignup
 */
export class UserSignup {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @static
 * @memberof UserSignup
 */
  static signUp(req, res) {
    const { name, email, confirmPassword } = req.body;
    let { password } = req.body;
    console.log('this is the password', password, 'and confirmed', confirmPassword);
    /* Checks password */
    if (!validator.equals(password, confirmPassword)) {
      return res.status(400).send({
        status: 'Fail',
        message: `Please your password ${password} do not match ${confirmPassword}`
      });
    }
    if (validator.isEmpty(password)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Please enter a valid password'
      });
    }
    if (!validator.isLength(password, { min: 8, max: undefined })) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Please your password cannot be less than 8 characters'
      });
    }

    /* encrypt password and stores in the database
    along with some user information */
    password = bcrypt.hashSync(password, 10);
    return Users
      .create({
        name,
        email,
        password,
      })
      .then((user) => {
        res.status(201).send({
          status: 'Success',
          message: 'Your account has been created',
          name: user.name,
          id: user.id
        });
      })
      .catch((err) => {
        return res.status(400).send({
          status: 'Fail',
          message: 'This username already exist, enter a new one',
          data: err.errors[0].message
        });
      });
  }
}
