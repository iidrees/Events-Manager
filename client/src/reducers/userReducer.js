/* Import types from action types */
import { 
  SIGN_UP, SIGNED_UP, 
  SIGN_UP_FAIL, SIGN_IN,
  SIGNED_IN, SIGN_IN_FAIL 
} from '../actions/types';


const initialState = { /* The initial state of the component */
  authenticated: false,
  status: '',
  user: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {/* The reducer listening for action to update store */
    case SIGN_UP: {
      return {
        ...state
      }
    }
    case SIGNED_UP: {
      return {
        ...state,
        status: action.payload.data.status,
        ...action.payload.data,
        authenticated: true
      }
    }
    case SIGN_UP_FAIL: {
      return {
        ...state,
        status: 'Error' || undefined,
        ...action.payload,
        authenticated: false
      }
    }
    case SIGN_IN: {
      return {
        ...state
      }
    }
    case SIGNED_IN: {
      return {
        ...state,
        status: action.payload.data.status,
        ...action.payload.data,
        authenticated: true
      }
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        status: 'Error' || undefined,
        ...action.payload,
        authenticated: false
      }
    }
    default: return state;
  }
};
