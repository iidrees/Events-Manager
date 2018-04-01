// import depdendencies
import validator from 'validator';
import moment from 'moment';

/**
 * @export
 * @class InputValidation
 */
class InputValidation {
/**
 * 
 * @static
 * @param {any} req { request object }
 * @param {any} res { response object }
 * @param {any} next { handler function }
 * @returns { object } JSON response
 * @memberof InputValidation
 */
  static centerInput(req, res, next) {
    const {
      name,
      location,
      address,
      owner,
      capacity,
      description,
      imgUrl
    } = req.body;

    const alphaNum = /^[a-zA-Z0-9]+$/i;

    if (
        typeof name !== 'string' ||
        typeof location !== 'string'||
        typeof address !== 'string' ||
        typeof owner !== 'string' ||
        typeof description !== 'string'||
        typeof capacity !== 'string'||
        typeof imgUrl !== 'string'
         ) {
      return res.status(400).send({
        status: 'Unsuccessful',
        message: 'Please fill all input fields'
      })
    }
    if (
      validator.isEmpty(name)||
      validator.isEmpty(location)||
      validator.isEmpty(address)||
      validator.isEmpty(owner)||
      validator.isEmpty(description)||
      validator.isEmpty(capacity)||
      validator.isEmpty(imgUrl)
      ) {
        // checks if the user input is empty
        return res.status(400).send({
          status: 'Unsuccessful',
          message: 'Please all form fields are required to be filled'
        })
      }
      

      if (
        validator.isAlphanumeric(name)
      ) {
        // checking if value is alphanumeric
        return res.status(400).send({
          status: 'Unsuccessful',
          message: 'Please enter a word or number'
        })
      }

      
      if (!validator.isInt(capacity)) {
        // checking if the capacity is an integer
        return res.status(400).send({
          status: 'Unsuccessful',
          message: 'Capacity of a center should be a number'
        })
      }
      next();
  }

  
/**
 * 
 * 
 * @static
 * @param {any} req { request object }
 * @param {any} res { response object }
 * @param {any} next { handler function }
 * @returns {object} JSON object
 * @memberof InputValidation
 */
static eventInput(req, res, next) {
    const {
      title,
      description,
      date,
      time,
      type,
      imgUrl
    } = req.body;
    const center = req.params.centerId;

    if (
      typeof title !== 'string' ||
      typeof date !== 'string' ||
      typeof time !== 'string' ||
      typeof description !== 'string'||
      typeof type !== 'string'||
      typeof imgUrl !== 'string'
       ) {
    return res.status(400).send({
      status: 'Unsuccessful',
      message: 'Please fill all input fields'
    })
  }

  if (
    validator.isEmpty(title)||
    validator.isEmpty(date)||
    validator.isEmpty(time)||
    validator.isEmpty(description)||
    validator.isEmpty(type)||
    validator.isEmpty(imgUrl)
    ) {
      return res.status(400).send({
        status: 'Unsuccessful',
        message: 'Please all form fields are required to be filled'
      })
    }
    

    if (!moment(date, 'DD-MM-YYYY',true).isValid()) {
      return res.status(400).send({
        status: 'Unsuccessful',
        message: 'This is the valid date format  \'DD-MM-YYYY\''
      })
    }

    next();
  }
}

export default InputValidation;