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
      credentials: true,
    })
      .then((response) => {        
        localStorage.setItem(token, response.data.data.token);
        // console.log( 'this is from user signup',localStorage.getItem(token));
        dispatch({ type: SIGNED_UP, payload: response.data });
        history.push('/getevents');
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
      method: 'POST',
      url: 'http://localhost:5050/api/v1/users/login',
      data: userData,
      withCredentials: true,
      
    })
      .then((response) => {
        // console.log(response.data.data.token)
        localStorage.setItem('x-access-token', response.data.data.token);
        console.log( 'this is from user signup',localStorage.getItem('x-access-token'));
        dispatch({ type: SIGNED_IN, payload: response.data });
        history.push('/getevents');
      })
      .catch((err) => {
        dispatch({ type: 'SIGNED_IN_FAIL', payload: err });
        history.push('/');
      });
  };
};

