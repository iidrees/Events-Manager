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
      //dispatch({ type: EDIT_CENTER, center })
      history.push('/getcenters')
    })
    .catch((err) => {
      //dispatch({ type: EDIT_CENTER_FAIL, err});
      console.log('This is the delete error from the server', err)
      //history.push(`/centerdetails/${index}`)
    })
  }
}