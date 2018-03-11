import { 
  GET_CENTER,
  GET_CENTER_FAIL

  } from '../actions/types';


  const initialState = { /* The initial state of the component */
    authenticated: false,
    status: '',
    message: '',
    data: [],
    events: []
  };

  export default (state=initialState, action) => {
    switch (action.type) {
      case GET_CENTER: {
        return {
          ...state,
          status: 'Success',
          message: action.center.message,
          ...action.center.data,
          ...action.center.data.data.events,
          authenticated: true
        }
      }
      case GET_CENTER_FAIL: {
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