import { EDIT_EVENT, EDIT_EVENT_FAIL } from '../actions/types';

const initialState = {
  /* The initial state of the component */
  authenticated: false,
  status: '',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type /* reducer listening for actions  */) {
    case EDIT_EVENT: {
      return {
        ...state,
        status: 'Success',
        message: action.event.message,

        authenticated: true
      };
    }
    case EDIT_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message,
        authenticated: false
      };
    }
    default:
      return state;
  }
};
