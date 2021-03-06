import {
  ADD_CENTER,
  ADD_CENTER_FAIL,
  ADD_IMG_FAIL,
  ADD_CENTER_START
} from '../actions/types';

const initialState = {
  authenticated: false,
  status: '',
  message: '',
  data: [],
  error: '',
  isLoading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CENTER_START: {
      return {
        isLoading: true
      };
    }
    case ADD_CENTER: {
      return {
        ...state,
        status: 'Success',
        message: action.center.message,
        authenticated: true
      };
    }
    case ADD_CENTER_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message
      };
    }
    case ADD_IMG_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful',
        error: action.error
      };
    }
    default:
      return state;
  }
};
