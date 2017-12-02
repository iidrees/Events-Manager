import axios from 'axios';
import { history } from '../routes';

import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED 
  } from './types';



export const getEvents = () => {
  return (dispatch) => {
    console.log('START_IT')
    console.log( 'from event actions',localStorage.getItem('x-access-token'))
    axios({
      method: 'GET',
      url: 'http://localhost:5050/api/v1/events',
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((events) => {
      console.log('GOTTEN_IT')
      console.log(events)
      dispatch({ type: GET_EVENTS, events })
      history.push('/');
    })
    .catch((err) => {
      console.log("ERRORSSSSS", err);
      dispatch({ type: EVENT_FAILED, err});
    })
  }
}

