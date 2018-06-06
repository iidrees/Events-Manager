/* Import dependencies and Modules */
import axios from 'axios';
import { history } from '../routes';

import {
  SIGN_UP,
  SIGNED_UP,
  SIGN_UP_FAIL,
  SIGN_IN,
  SIGNED_IN,
  SIGN_IN_FAIL,
  SIGN_OUT
} from './types';

/**
 * Axios will help make POST request to signup user
 * @export {function}
 * @param {any} userData {Object data sent to the server}
 * @returns {JSON} userData
 */
export const userSignup = userData => {
  return dispatch => {
    return axios({
      method: 'post',
      url: '/api/v1/users',
      data: userData,
      withCredentials: true
    })
      .then(response => {
        localStorage.setItem('x-access-token', response.data.data.token);
        dispatch({ type: SIGNED_UP, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: SIGN_UP_FAIL, payload: err.response.data });
      });
  };
};

/**
 * Axios will help make POST request to signin a user
 * @export {function}
 * @param {any} userData {Object data sent to the server}
 * @returns {JSON} userData
 */
export const userSignin = userData => {
  return dispatch => {
    // dispatcher sends action to userReducer
    dispatch({ type: 'SIGN_IN' });
    return axios({
      // axios request is made
      method: 'POST',
      url: '/api/v1/users/login',
      data: userData,
      withCredentials: true
    })
      .then(response => {
        // the response is used to let user access protected resource
        localStorage.setItem('x-access-token', response.data.data.token);
        const token1 = localStorage.getItem('x-access-token');
        dispatch({ type: SIGNED_IN, payload: response.data });
      })
      .catch(err => {
        // if there is an error, no access is given to user.
        dispatch({ type: SIGN_IN_FAIL, payload: err.response.data });
      });
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('x-access-token');
    return dispatch({ type: SIGN_OUT });
  };
};
