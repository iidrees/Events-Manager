import {
  GET_CENTER,
  GET_CENTER_FAIL,
  CANCEL_EVENT,
  CANCEL_EVENT_FAIL
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
    case CANCEL_EVENT: {
      const newEvent = state.events.map(obj => {
        if (obj.id === action.response.newEvent.id) {
          return action.response.newEvent;
        }
        return obj;
      });
      return {
        events: [...newEvent],
        center: state.center
      };
    }
    case CANCEL_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message,
        authenticated: false
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
