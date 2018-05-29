/*  Import dependencies and modules */
import axios from 'axios';
import { history } from '../routes';

import { GET_ALL_CENTERS, CENTERS_SUCCESS, CENTERS_ERRORS } from './types';

/**
 * Axios will help make POST request to signup user
 * @param {pageNo} pageNo - page number
 * @export {function} -
 * @returns {JSON} JSON
 */
const getCenters = pageNo => {
  // function to get all centers
  return dispatch => {
    // axios request is made
    return axios({
      method: 'GET',
      url: `/api/v1/centers?page=${pageNo}`
    })
      .then(response => {
        // when response is recieved
        dispatch({ type: CENTERS_SUCCESS, centers: response.data });
      })
      .catch(err => {
        dispatch({ type: CENTERS_ERRORS, error: err.response.data });
      });
  };
};

export default getCenters;
