
import axios from 'axios';
import { history } from '../routes';

import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED, GET_EVENT, EVENT_FAIL

  } from './types';


/**
 * Axios will help make GET request for events a user posted
 * @export {function}
 * @param {any} - null
 * @returns {JSON} JSON data containing events 
 */
export const getEvents = () => {
  return (dispatch) => {// axios request is made
    axios({
      method: 'GET',
      url: '/api/v1/events',
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((events) => {// when events response is received, dispatcher fires so store can be updated
      dispatch({ type: GET_EVENTS, events })
      //history.push('/getevents');
    })
    .catch((err) => {// if any error is returned, it is shown to the user.
      console.log('this is from the actions', err.response)
      dispatch({ type: EVENT_FAILED, err});
      history.push('/getevents')
    })
  }
}

export const detailEvent = (index) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `/api/v1/events/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((event) => {
      dispatch({ type: GET_EVENT, event })
      //history.push('/eventdetails/:id')
    })
    .catch((err) => {
      console.log('this is the action error details', err.response)
      dispatch({ type: EVENT_FAIL, err });
      //history.push('/eventdetails/:id');
    })
  }
}