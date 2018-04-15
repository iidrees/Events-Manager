/*  Import dependencies and modules */
import axios from 'axios';
import { history } from '../routes';

import { 
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from './types';

/**
 * Axios will help make POST request to signup user
 * @export {function} -
 * @returns {JSON} JSON
 */
const getCenters = () => {// function to get all centers
  return (dispatch) => {// axios request is made
   return axios({
      method: 'GET',
      url: '/api/v1/centers'
    })
    .then((response) => {// when response is recieved)
      console.log('this is the actions',response.data  )
      dispatch({ type: CENTERS_SUCCESS,  centers: response.data })
    })
    .catch((err) => {
      console.log('this is the actions', err.response.data  )
      dispatch({ type: CENTERS_ERRORS, error: err.response.data })
    })

  }
}

export default getCenters;