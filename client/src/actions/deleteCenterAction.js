import axios from 'axios';
import { history } from '../routes';

import { DELETE_CENTER, DELETE_CENTER_FAIL } from './types';

/**
 *
 *
 * @param {any} index - centerId
 * @returns {void} -
 */
export const deleteCenter = index => {
  // eslint-disable-line
  return dispatch => {
    return axios({
      method: 'DELETE',
      url: `/api/v1/centers/${index}`,
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
