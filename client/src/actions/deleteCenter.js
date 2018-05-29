import axios from 'axios';
import { history } from '../routes';

import { DELETE_CENTER, DELETE_CENTER_FAIL } from './types';

/**
 *
 *
 * @param {centerId} centerId - centerId
 * @returns {void} -
 */
const deleteCenter = centerId => {
  return dispatch => {
    return axios({
      method: 'DELETE',
      url: `/api/v1/centers/${centerId}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: DELETE_CENTER, centerDeleted: response.data });
      })
      .catch(err => {
        dispatch({ type: DELETE_CENTER_FAIL, error: err.response.data });
      });
  };
};

export default deleteCenter;
