// import depdendencies
import validator from 'validator';
import moment from 'moment';
import Sequelize from 'sequelize';

import { Events } from '../models';
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
    const { name, location, owner, capacity, description, imgUrl } = req.body;

    const alphaNum = /^[a-zA-Z0-9]/;

    if (
      typeof name !== 'string' ||
      typeof location !== 'string' ||
      typeof owner !== 'string' ||
      typeof description !== 'string'
    ) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please fill all input fields'
      });
    }
    if (
      validator.isEmpty(name) ||
      validator.isEmpty(location) ||
      validator.isEmpty(owner) ||
      validator.isEmpty(description) ||
      validator.isEmpty(capacity + '') ||
      validator.isEmpty(imgUrl + '')
    ) {
      // checks if the user input is empty
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please all form fields are required to be filled'
      });
    }

    if (!validator.isInt(capacity + '')) {
      // checking if the capacity is an integer
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'Capacity of a center should be a number'
      });
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
    const { title, description, startDate, endDate, imgUrl } = req.body;
    const center = req.params.centerId;

    if (
      typeof title + '' !== 'string' ||
      typeof startDate + '' !== 'string' ||
      typeof endDate + '' !== 'string' ||
      typeof description + '' !== 'string'
    ) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please fill all input fields'
      });
    }

    if (
      validator.isEmpty(title) ||
      validator.isEmpty(startDate) ||
      validator.isEmpty(endDate) ||
      validator.isEmpty(description) ||
      validator.isEmpty(imgUrl + '')
    ) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please all form fields are required to be filled'
      });
    }

    if (
      !moment(startDate, 'YYYY-MM-DD', true).isValid() ||
      !moment(endDate, 'YYYY-MM-DD', true).isValid()
    ) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message:
          "Please ensure that your dates are not in the past and are in this date format  'YYYY-MM-DD'"
      });
    }

    if (startDate > endDate) {
      return res.status(422).send({
        status: 'Unsuccessful',
        message:
          'your event start date cannot be after the end date and vice versa'
      });
    }

    next();
  }
}

export default InputValidation;
