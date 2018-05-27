import axios from 'axios';
import { history } from '../routes';

import {
  EDIT_CENTER,
  EDIT_CENTER_FAIL,
  EDIT_CENTER_START,
  ADD_IMG_FAIL
} from './types';

/**
 *
 *
 * @param {any} index - the centerId
 * @param {any} centerData -the centerData is the update
 * @param {any} imgUrl - the url for the image uploaded on cloudinary
 * @returns {void}
 */
export const editCenter = (index, centerData, imgUrl) => {
  return dispatch => {
    return axios({
      method: 'PUT',
      url: `/api/v1/centers/${index}`,
      data: {
        name: centerData.name,
        location: centerData.location,
        capacity: centerData.capacity,
        owner: centerData.owner,
        description: centerData.description,
        imgUrl: imgUrl
      },
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      withCredentials: true
    })
      .then(center => {
        dispatch({ type: EDIT_CENTER, center: center.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_CENTER_FAIL, error: err.response.data });
      });
  };
};

/**
 * @export {function} imageUpload function
 * @param {index}  index {centerId}
 * @param {centerData} centerData object sent to the server
 * @returns {URL} URL link returned is used as a parameter
 */
export const imageUpload = (index, centerData) => {
  let formData = new FormData();
  formData.append('file', centerData.imgFile);
  formData.append('upload_preset', process.env.UPLOAD_PRESET);
  return dispatch => {
    dispatch({ type: EDIT_CENTER_START });
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
        return dispatch(editCenter(index, centerData, imageURL));
      })
      .catch(err => {
        dispatch({
          type: ADD_IMG_FAIL,
          error: 'Image upload failed'
        });
      });
  };
};
