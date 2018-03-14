import axios from 'axios';
import { history } from '../routes';

import {
  ADD_CENTER,
  ADD_CENTER_FAIL
} from './types'


/**
 * Axios will help make POST request to add a center
 * @export {function} fn
 * @param {centerData} centerData {Object data sent to the server}
 * @returns {JSON} userData
 */
export const addCenter = (centerData) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/centers',
      data: {
        name: centerData.name,
        location: centerData.location,
        address: centerData.address,
        capacity: centerData.capacity,
        owner: centerData.owner,
        description: centerData.description,
      },
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
    .then((res) => {
      
      dispatch({ type: ADD_CENTER, res })
      history.push('/getcenters')
    })
    .catch((err) => {
      
      dispatch({ type: ADD_CENTER_FAIL, err })
      history.push('/addcenter')
    })
  }
}

