import axios from 'axios';
import { history } from '../routes';

import { 
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from './types';

const getCenters = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'http://localhost:5050/api/v1/centers'
    })
    .then((centers) => {
      dispatch({ type: CENTERS_SUCCESS, centers })
    })
    .catch((err) => {
      dispatch({ type: CENTERS_ERRORS, err })
    })

  }
}

export default getCenters;