import { EDIT_EVENT, EDIT_EVENT_FAIL, EDIT_EVENT_LOAD } from '../actions/types';

const initialState = {
  /* The initial state of the component */
  authenticated: false,
  status: '',
  message: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type /* reducer listening for actions  */) {
    case EDIT_EVENT_LOAD: {
      return {
        isLoading: true
      };
    }
    case EDIT_EVENT: {
      return {
        ...state,
        status: 'Success',
        message: action.event.message,
        isLoading: false,
        authenticated: true
      };
    }
    case EDIT_EVENT_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.error.message,
        isLoading: false,
        authenticated: false
      };
    }
    default:
      return state;
  }
};
