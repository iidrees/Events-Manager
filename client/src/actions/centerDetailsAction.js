import axios from 'axios';
import { history } from '../routes';

import { 
  GET_CENTER,
  GET_CENTER_FAIL

  } from './types';

/* eslint-disable */
export const centerDetails = (index) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `/api/v1/centers/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((center) => {
      dispatch({ type: GET_CENTER, center })
    })
    .catch((err) => {
      dispatch({ type: GET_CENTER_FAIL, err});
    })
  }
}