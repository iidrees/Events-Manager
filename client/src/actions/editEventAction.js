import axios from 'axios';
import { history } from '../routes';

import { 
  EDIT_EVENT,
  EDIT_EVENT_FAIL

  } from './types';


/**
 * Axios will help make PUT request to add event
 * @export {function}
 * @param {eventData} eventData - JSON
 * @param {index} index -
 * @returns {JSON} JSON data containing events 
 */
export const editEvent = (eventData,index) => { // eslint-disable-line
  return (dispatch) => {
    return axios({
      method: 'PUT',
      url: `/api/v1/events/${index}`,
      data: eventData,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((event) => {
      dispatch({ type: EDIT_EVENT, event: event.data })
    })
    .catch((err) => {
      dispatch({ type: EDIT_EVENT_FAIL, error: err.response.data });
    })
  }
}