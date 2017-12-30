import {
  ADD_CENTER,
  ADD_CENTER_FAIL
} from '../actions/types';

const initialState = {
  authenticated: false,
  status: '',
  message: '',
  data: []
};
export default (state= initialState, action) => {
  switch (action.type) {
    case ADD_CENTER: {
      return {
        ...state, 
        status: 'Success',
        message: action.res.message,
        ...action.res.data,
        authenticated: true
      }
    }
    case ADD_CENTER_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.err.response.data.message,
        authenticated: false
      }
    }
    default: return state;
  }
}