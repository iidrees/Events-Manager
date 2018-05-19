import { EDIT_CENTER, EDIT_CENTER_FAIL } from '../actions/types';

const initialState = {
  /* The initial state of the component */
  authenticated: false,
  status: '',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type /* reducer listening for actions  */) {
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
        authenticated: false
      };
    }
    default:
      return state;
  }
};
