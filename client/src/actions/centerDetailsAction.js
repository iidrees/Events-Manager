import axios from 'axios';
import { history } from '../routes';

import {
  GET_CENTER,
  GET_CENTER_FAIL,
  CANCEL_EVENT,
  CANCEL_EVENT_FAIL
} from './types';

/**
 *  @param {index} index the center's index
 * @param {page} page - page number
 * @returns {JSON} object
 */
export const centerDetails = (index, page) => {
  return dispatch => {
    return axios({
      method: 'GET',
      url: `/api/v1/centers/${index}?page=${page}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: GET_CENTER, response: response.data });
      })
      .catch(err => {
        dispatch({ type: GET_CENTER_FAIL, error: err.response.data });
      });
  };
};

/**
 * @param {index} index -
 * @returns {void}
 */
export const cancelEvent = index => {
  return dispatch => {
    return axios({
      method: 'PUT',
      url: `/api/v1/cancelEvent/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: CANCEL_EVENT, response: response.data });
      })
      .catch(err => {
        dispatch({ type: CANCEL_EVENT_FAIL, error: err.response.data });
      });
  };
};
