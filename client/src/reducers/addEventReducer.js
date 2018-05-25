import {
  ADD_EVENT,
  ADD_EVENT_FAIL,
  ADD_IMG_FAIL,
  ADD_EVENT_LOAD
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
    case ADD_EVENT_LOAD: {
      return { isLoading: true };
    }
    case ADD_EVENT: {
      return {
        ...state,
        status: 'Success',
        message: action.event.message,
        ...action.event.data,
        authenticated: true
      };
    }
    case ADD_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message,
        error: action.error.error,
        isLoading: false
      };
    }
    case ADD_IMG_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful',
        error: action.error,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
