import {
  ADD_EVENT,
  ADD_EVENT_FAIL,
  ADD_IMG_FAIL
} from '../actions/types';

const initialState = {
  authenticated: false,
  status: '',
  message: '',
  data: [],
  error: ''
};
export default (state= initialState, action) => {
  switch (action.type) {
    case ADD_EVENT: {
      return {
        ...state, 
        status: 'Success',
        message: action.res.message,
        ...action.res.data,
        authenticated: true
      }
    }
    case ADD_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        ...action.err.response.data
       
      }
    }
    case ADD_IMG_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful',
        error: action.error

      }
    }
    default: return state;
  }
}