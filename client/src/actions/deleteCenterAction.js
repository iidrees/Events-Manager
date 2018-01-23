import axios from 'axios';
import { history } from '../routes';

import { 
  DELETE_CENTER,
  DELETE_CENTER_FAIL

  } from './types';

/* eslint-disable */
export const deleteCenter = (index) => {
  return (dispatch) => {
    axios({
      method: 'DELETE',
      url: `/api/v1/centers/${index}`,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((center) => {
      
      history.push('/getcenters')
    })
    .catch((err) => {
      dispatch({ type: DELETE_CENTER_FAIL, err});
      
      history.push(`/centerdetails/${index}`)
    })
  }
}