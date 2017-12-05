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
    axios({
      method: 'GET',
      url: '/api/v1/centers'
    })
    .then((centers) => {// when response is recieved
      dispatch({ type: CENTERS_SUCCESS, centers })
      history.push('/getcenters')
    })
    .catch((err) => {
      dispatch({ type: CENTERS_ERRORS, err })
      history.push('/getcenters')
    })

  }
}

export default getCenters;