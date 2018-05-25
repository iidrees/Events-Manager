import {
  EDIT_CENTER,
  EDIT_CENTER_FAIL,
  EDIT_CENTER_START
} from '../actions/types';

const initialState = {
  /* The initial state of the component */
  authenticated: false,
  status: '',
  message: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type /* reducer listening for actions  */) {
    case EDIT_CENTER_START: {
      return {
        isLoading: true
      };
    }
    case EDIT_CENTER: {
      return {
        ...state,
        status: 'Success',
        message: action.center.message,
        authenticated: true
      };
    }
    case EDIT_CENTER_FAIL: {
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
