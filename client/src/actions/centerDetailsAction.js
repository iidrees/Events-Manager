import axios from 'axios';
import { history } from '../routes';

import { 
  GET_CENTER,
  GET_CENTER_FAIL

  } from './types';

/**
 * 
 * 
 * @param {any} index the center's index
 * @returns {JSON} object
 */
export const centerDetails = (index,page) => { // eslint-disable-line
  return (dispatch) => {
   return axios({
      method: 'GET',
      url: `/api/v1/centers/${index}?page=${page}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((response) => {
      console.log('the details actions>>>', response.data)
      dispatch({ type: GET_CENTER, response: response.data })
    })
    .catch((err) => {
      dispatch({ type: GET_CENTER_FAIL, error: err.response.data});
    })
  }
}