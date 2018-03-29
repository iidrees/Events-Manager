import axios from 'axios';
import { history } from '../routes';

import { 
  EDIT_CENTER,
  EDIT_CENTER_FAIL

  } from './types';

/* eslint-disable */
export const editCenter = (index, centerData ) => {
  return (dispatch) => {
    return axios({
      method: 'PUT',
      url: `/api/v1/centers/${index}`,
      data: centerData,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((center) => {
      dispatch({ type: EDIT_CENTER, center: center.data.data })
      //history.push('/getcenters')
    })
    .catch((err) => {
      dispatch({ type: EDIT_CENTER_FAIL, error: err.response.data});
      //history.push('/editcenter')
    })
  }
}