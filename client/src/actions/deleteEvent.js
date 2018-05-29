import axios from 'axios';
import toastr from 'toastr';
import { history } from '../routes';

import { DELETE_EVENT, DELETE_EVENT_FAIL, GET_EVENTS_ON_DELETE } from './types';

/**
 * @param {any} index - eventId
 * @returns {void}
 */
export const deleteEvent = index => {// eslint-disable-line
  return dispatch => {
    return axios({
      method: 'DELETE',
      url: `/api/v1/events/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: DELETE_EVENT, eventDeleted: response.data });
      })
      .catch(err => {
        dispatch({ type: DELETE_EVENT_FAIL, error: err.response.data });
      });
  };
};
