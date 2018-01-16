import axios from 'axios';
import { history } from '../routes';

import { 
  EDIT_EVENT,
  EDIT_EVENT_FAIL

  } from './types';


  /* eslint-disable */
/**
 * Axios will help make PUT request to add event
 * @export {function}
 * @param {eventData} - JSON
 * @returns {JSON} JSON data containing events 
 */
export const editEvent = (eventData,index) => {
  /* disable-eslint */
  return (dispatch) => {
    axios({
      method: 'PUT',
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
      dispatch({ type: EDIT_EVENT_FAIL, err });
      history.push('/addevents')
    })
  }
}