/* Import dependencies and Modules */

import axios from 'axios';
import { history } from '../routes';

import {
  ADD_EVENT,
  ADD_EVENT_FAIL,
  ADD_IMG_FAIL,
  GET_EVENT,
  ADD_EVENT_LOAD
} from './types';

/**
 * Axios will help make POST request to add event
 * @export {function} addEvent function action
 * @param {eventData} eventData object sent to the server
 * @param {index}  index {centerId}
 * @param {imgUrl} imgUrl {the cloudinary url}
 * @returns {JSON} JSON data containing events
 */
export const addEvent = (eventData, index, imgUrl) => {
  return dispatch => {
    return axios({
      method: 'post',
      url: `/api/v1/events/${index}`,
      data: {
        title: eventData.title,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        center: eventData.center,
        description: eventData.description,
        imgUrl: imgUrl
      },
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({ type: ADD_EVENT, event: response.data });
      })
      .catch(err => {
        dispatch({ type: ADD_EVENT_FAIL, error: err.response.data });
      });
  };
};

/**
 * @export {function} imageUpload function
 * @param {eventData} eventData object sent to the server
 * @param {index}  index {centerId}
 * @returns {URL} URL link returned is used as a parameter
 */
export const imageUpload = (eventData, index) => {
  let formData = new FormData();

  formData.append('file', eventData.imgFile);
  formData.append('upload_preset', process.env.UPLOAD_PRESET);
  return dispatch => {
    dispatch({ type: ADD_EVENT_LOAD });
    axios({
      method: 'post',
      url: process.env.CLOUDINARY_URL,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        let imageURL = response.data.secure_url;
        return dispatch(addEvent(eventData, index, imageURL));
      })
      .catch(err => {
        dispatch({
          type: ADD_IMG_FAIL,
          error: 'Image upload failed'
        });
      });
  };
};
