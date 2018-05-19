import axios from 'axios';
import { history } from '../routes';

import { 
  EDIT_CENTER,
  EDIT_CENTER_FAIL

  } from './types';

/**
 * 
 * 
 * @param {any} index - the centerId 
 * @param {any} centerData -the centerData is the update
 * @returns {void} 
 */
export const editCenter = (index, centerData ) => {// eslint-disable-line
  return (dispatch) => {
    return axios({
      method: 'PUT',
      url: `/api/v1/centers/${index}`,
      data: centerData,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((center) => {
      dispatch({ type: EDIT_CENTER, center: center.data})
    })
    .catch((err) => {
      dispatch({ type: EDIT_CENTER_FAIL, error: err.response.data});
    })
  }
}