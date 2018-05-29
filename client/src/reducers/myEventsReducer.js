/* Import action types from the action type module */
import {
  GET_MY_EVENTS,
  MY_EVENT_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_FAIL,
  ADD_IMG_FAIL
} from '../actions/types';

export const initialState = {
  /* The initial state of the state */
  status: '',
  message: '',
  events: [],
  error: ''
};

export default (state = initialState, action) => {
  switch (
    action.type /* reducer listening for actions and update the store */
  ) {
    case GET_MY_EVENTS: {
      return {
        ...state,
        status: 'Success',
        message: action.events.message,
        events: [...action.events.data.rows],
        count: action.events.data.count
      };
    }
    case MY_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.err.message,
        error: action.err.error
      };
    }
    case DELETE_EVENT: {
      let newEvents = state.events.filter(
        obj => obj.id !== action.eventDeleted.eventId
      );
      return {
        ...state,
        status: 'Success',
        message: action.eventDeleted.message,
        authenticated: true,
        events: [...newEvents]
      };
    }
    case DELETE_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        error: action.error.error,
        authenticated: false
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
