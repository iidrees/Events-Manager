import {
  GET_CENTER,
  GET_CENTER_FAIL
  // DELETE_CENTER,
  // DELETE_CENTER_FAIL
} from '../actions/types';

const initialState = {
  /* The initial state of the component */
  status: '',
  message: '',
  center: {},
  events: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CENTER: {
      return {
        ...state,
        status: 'Success',
        message: action.response.message,
        center: action.response.data.center,
        events: [...action.response.data.events.rows],
        count: action.response.data.events.count,
        authenticated: true,
        isLoading: true
      };
    }
    case GET_CENTER_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message,
        authenticated: false,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
