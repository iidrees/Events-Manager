
import axios from 'axios';
import { history } from '../routes';

import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED, GET_EVENT, EVENT_FAIL

  } from './types';


/**
 * Axios will help make GET request for events a user posted
 * @export {function}
 * @returns {JSON} JSON data containing events 
 */
export const getEvents = () => {
  return (dispatch) => {// axios request is made
    return axios({
      method: 'GET',
      url: '/api/v1/events',
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((response) => {// when events response is received, dispatcher fires so store can be updated
      dispatch({ type: GET_EVENTS, events: response.data.data })
      //history.push('/getevents');
    })
    .catch((error) => {// if any error is returned, it is shown to the user.
      dispatch({ type: EVENT_FAILED, err: error.response.data});
      //history.push('/getevents')
    })
  }
}

/**
 * Axios will help make GET request for events a user posted
 * @export {function}
 * @param {index} index {args}
 * @returns {JSON} JSON data containing events 
 */
export const detailEvent = (index) => {
  return (dispatch) => {
    return axios({
      method: 'GET',
      url: `/api/v1/events/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((response) => {
      dispatch({ type: GET_EVENT, response: response.data })
      //history.push('/eventdetails/:id')
    })
    .catch((err) => {
      dispatch({ type: EVENT_FAIL, error: err.response.data });
      //history.push('/eventdetails/:id');
    })
  }
}