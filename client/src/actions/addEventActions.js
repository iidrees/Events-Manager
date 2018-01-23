/* Import dependencies and Modules */

import axios from 'axios';
import { history } from '../routes';

import { 
  ADD_EVENT, 
  ADD_FAIL, 
  GET_EVENTS,
  
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from './types';

/* eslint-disable */
/**
 * Axios will help make POST request to add event
 * @export {function}
 * @param {eventData} - JSON
 * @returns {JSON} JSON data containing events 
 */
export const addEvent = (eventData,index) => {
  /* disable-eslint */
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/events/${index}`,
      data: eventData,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then(() => {
      history.push('/getevents')
    })
    .catch((err) => {
      dispatch({ type: ADD_FAIL, err });
      history.push('/addevents')
    })
  }
}