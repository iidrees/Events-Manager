import axios from 'axios';
import { history } from '../routes';

import { 
  DELETE_EVENT,
  DELETE_EVENT_FAIL

  } from './types';

  
/* eslint-disable */
export const deleteEvent = (index) => {
  return (dispatch) => {
    axios({
      method: 'DELETE',
      url: `/api/v1/events/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((center) => {
      
      history.push('/getevents')
    })
    .catch((err) => {
      dispatch({ type: DELETE_EVENT_FAIL, err});
      
      history.push(`/eventdetails/${index}`)
    })
  }
}