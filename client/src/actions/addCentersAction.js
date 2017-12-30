import axios from 'axios';

import {
  ADD_CENTER,
  ADD_CENTER_FAIL
} from './types'

/* eslint-disable */
export const addCenter = (centerData) => {
  console.log('centerData from actions', centerData);
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/centers',
      data: centerData,
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((res) => {
      console.log('res from actions addcenter',  res);
      dispatch(({ type: ADD_CENTER, res }))
    })
    .catch((err) => {
      console.log('err from actions addcenters', err);
      dispatch({ type: ADD_CENTER_FAIL, err });
    })
  }
}