import axios from 'axios';
import { history } from '../routes';

import { 
  SIGN_UP, SIGNED_UP, 
  SIGN_UP_FAIL, SIGN_IN, 
  SIGNED_IN, SIGN_IN_FAIL 
} from './types';

/**
 * Axios will help make POST request to signup user
 * @export {function}
 * @param {any} userData
 * @returns {JSON} userData
 */
export const userSignup = (userData) => {
  return (dispatch) => {
    dispatch({ type: 'SIGN_UP' });
    axios({
      method: 'post',
      url: 'http://localhost:5050/api/v1/users',
      data: userData,
      withCredentials: true,
    })
      .then((response) => {
        dispatch({ type: SIGNED_UP, payload: response.data });
        history.push('/getEvents');
      })
      .catch((err) => {
        dispatch({ type: 'SIGN_UP_FAIL', payload: err });
        history.push('/');
      });
  };
};

export const userSignin = (userData) => {
  return (dispatch) => {
    dispatch({ type: 'SIGN_IN' });
    axios({
      method: 'post',
      url: 'http://localhost:5050/api/v1/users/login',
      data: userData,
      withCredentials: true,
    })
      .then((response) => {
        dispatch({ type: SIGNED_IN, payload: response.data });
        history.push('/login');
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: 'SIGNED_IN_FAIL', payload: err });
      // history.push('/login);
      });
  };
};

/**
 * @export {function}
 * @param {any} userData
 * @returns {JSON} userData
 */
/* export function userSigninRequest(userData) {
  return dispatch => axios.post('/api/v1/users/login', userData);
}
 */
