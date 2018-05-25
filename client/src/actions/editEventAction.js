import axios from 'axios';
import { history } from '../routes';

import {
  EDIT_EVENT_LOAD,
  EDIT_EVENT,
  EDIT_EVENT_FAIL,
  ADD_IMG_FAIL
} from './types';

/**
 * Axios will help make PUT request to add event
 * @export {function}
 * @param {eventData} eventData - JSON
 * @param {index} index -
 * @returns {JSON} JSON data containing events
 */
export const editEvent = (eventData, index, imgUrl) => {
  return dispatch => {
    return axios({
      method: 'PUT',
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
      .then(event => {
        dispatch({ type: EDIT_EVENT, event: event.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_EVENT_FAIL, error: err.response.data });
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
    dispatch({ type: EDIT_EVENT_LOAD });
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
        return dispatch(editEvent(eventData, index, imageURL));
      })
      .catch(err => {
        dispatch({
          type: ADD_IMG_FAIL,
          error: 'Image upload failed'
        });
      });
  };
};
