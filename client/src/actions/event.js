import axios from 'axios';
import { history } from '../routes';

import {
  GET_EVENTS,
  EVENT_RETRIEVED,
  EVENT_FAILED,
  GET_EVENT,
  EVENT_FAIL,
  GET_MY_EVENTS,
  MY_EVENT_FAIL,
  GET_EVENT_DETAIL,
  EVENT_DETAIL_FAIL
} from './types';

/**
 * Axios will help make GET request for events a user posted
 * @param {pageNo} pageNo - pageNo needed for calculating the offset and limit
 * @export {function}
 * @returns {JSON} JSON data containing events
 */
export const getMyEvents = pageNo => {
  return dispatch => {
    // axios request is made
    return axios({
      method: 'GET',
      url: `/api/v1/events/userevents?page=${pageNo}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        // when events response is received
        dispatch({ type: GET_MY_EVENTS, events: response.data });
      })
      .catch(error => {
        // if any error is returned, it is shown to the user.
        dispatch({ type: MY_EVENT_FAIL, err: error.response.data });
      });
  };
};

/**
 * Axios will help make GET request for events a user posted
 * @export {function}
 * @param {eventId} eventId - evenId of the event
 * @returns {JSON} JSON data containing events
 */
export const detailEvent = eventId => {
  return dispatch => {
    return axios({
      method: 'GET',
      url: `/api/v1/events/${eventId}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: GET_EVENT_DETAIL, event: response.data });
      })
      .catch(err => {
        dispatch({ type: EVENT_DETAIL_FAIL, error: err.response.data });
      });
  };
};
