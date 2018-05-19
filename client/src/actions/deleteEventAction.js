import axios from 'axios';
import { history } from '../routes';

import { 
  DELETE_EVENT,
  DELETE_EVENT_FAIL

  } from './types';

  
/* eslint-disable */
export const deleteEvent = (index) => {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: `/api/v1/events/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((response) => {
      dispatch({ type: DELETE_EVENT, eventDeleted: response.data })
      //history.push('/getevents')
    })
    .catch((err) => {
      dispatch({ type: DELETE_EVENT_FAIL, error: err.response.data});
      
      //history.push(`/eventdetails/${index}`)
    })
  }
}