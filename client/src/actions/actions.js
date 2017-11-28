import axios from 'axios';

/**
 * Axios will help make POST
 * @export {function}
 * @param {any} userData
 * @returns {JSON} userData
 */
export default function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/users', userData);
}
