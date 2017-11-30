import { SIGN_UP, SIGNED_UP, SIGN_UP_FAIL, SIGN_IN,
  SIGNED_IN, SIGN_IN_FAIL } from '../actions/types';


const initialState = {
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
  console.log('Reducer');
  switch (action.type) {
    case SIGN_UP: {
      console.log('SIGNING UP ', action.payload);
      return {
        ...state
      }
    }
    case SIGNED_UP: {
      console.log('FINISHED SIGNING UP');
      return {
        ...state,
        status: action.payload.data.status,
        ...action.payload.data,
        authenticated: true
      }
    }
    case SIGN_UP_FAIL: {
      console.log('SIGN UP FAILED');
      return {
        ...state,
        status: 'Error' || undefined,
        ...action.payload,
        authenticated: false
      }
    }
    case SIGN_IN: {
      console.log('SIGNING IN', action.payload);
      return {
        ...state
      }
    }
    case SIGNED_IN: {
      console.log('SIGN IN COMPLETE');
      return {
        ...state,
        status: action.payload.data.status,
        ...action.payload.data,
        authenticated: true
      }
    }
    case SIGN_IN_FAIL: {
      console.log('SIGN IN FAIL');
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
