/*  import types  from Actions directory */
import {
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from '../actions/types';

const initialState = {
  status: '',
  message: '',
  centers: [],
  error: ''
}; // the initial state of the component

export default (state = initialState, action) => {
  switch (
    action.type /* reducer types listening for 
                        actions and payload in order to update store */
  ) {
    case CENTERS_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        status: 'Success',
        message: action.centers.message,
        centers: [...action.centers.data.rows],
        count: action.centers.data.count
      };
    }
    case CENTERS_ERRORS: {
      return {
        ...state,
        authenticated: false,
        status: 'Unsuccessful',
        message: action.error.message,
        error: action.error.error
      };
    }
    default:
      return state;
  }
};
