/* Import dependencies and Modules */

import axios from 'axios';
import { history } from '../routes';

import { 
  ADD_EVENT, ADD_FAIL, 
  GET_EVENTS
} from './types';


/**
 * Axios will help make POST request to add event
 * @export {function}
 * @param {eventData} - JSON
 * @returns {JSON} JSON data containing events 
 */
export const addEvent = (eventData) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:5050/api/v1/events',
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