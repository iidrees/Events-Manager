import axios from 'axios';
import toastr from 'toastr';
import { history } from '../routes';

import { DELETE_EVENT, DELETE_EVENT_FAIL } from './types';

/**
 * @param {eventId} eventId - eventId
 * @returns {void}
 */
const deleteEvent = eventId => {
  return dispatch => {
    return axios({
      method: 'DELETE',
      url: `/api/v1/events/${eventId}`,
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
export default deleteEvent;
