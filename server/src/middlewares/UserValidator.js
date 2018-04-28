// import depdendencies
import validator from 'validator';


/**
 * 
 * validates user input 
 * @export
 * @class userValidator
 */
class UserValidator {

  /**
   * Signup User input validaton 
   * @static
   * @param {any} req { request body }
   * @param {any} res { response body }
   * @param {any} next { goes to the next handler }
   * @returns { object } JSON object
   * @memberof userValidator
   */
  static userSignUpInput(req, res, next) {
    const { name, email, confirmPassword } = req.body;
    let { password } = req.body;

    /* validates user input */
    if (name === undefined ||  
         email === undefined || 
         password === undefined ||  
         confirmPassword === undefined ) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Please enter the required input in all required fields'
      });
    }
    if (validator.isEmpty(password + '') || !password) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Please enter a password'
      });
    }
    if (validator.isEmpty(email)) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Please enter your email address'
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Please enter a valid email address'
      })
    }
    if (!validator.equals(
    '' + password.toLowerCase().trim(),
    '' + confirmPassword.toLowerCase().trim())
        ) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Your password do not match'
      });
    }
    if (!validator.isLength('' + password.toLowerCase().trim(), 
    { min: 8, max: 15 })) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Password cannot be less than 8 characters'
      });
    }
    if (!validator.isAlphanumeric(password)){
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Password must contain letters and numerals'
      })
    }
    next();
  }


/**
 * Signin User input validaton 
 * @static
 * @param {any} req { request body }
 * @param {any} res { response body }
 * @param {any} next { goes to the next
 * @returns { object } JSON object
 * @memberof UserValidator
 */
static userSignInInput(req, res, next) {
  const { email, password } = req.body;
  if ( email === undefined || 
    password === undefined  ) {
    return res.status(401).send({
      status: 'Unsuccessful',
      message: 'Please enter all fields'
    });
  }
  if (validator.isEmpty(''+password) || 
      password === undefined ||
      password === null
      ) {
      return res.status(401).send({
        status: 'Unsuccessful',
        message: 'Please enter your password'
      });
  }
  if ( validator.isEmpty(email) ) {
    return res.status(401).send({
      status: 'Unsuccessful',
      message: 'Please enter your email address'
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).send({
      status: 'Unsuccessful',
      message: 'Please enter your email address in this format \'joe@example.com\''//eslint-disable-line
    })
  }
   next();
  }
}

export default UserValidator;