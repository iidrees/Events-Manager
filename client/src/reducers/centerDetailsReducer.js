import { 
  GET_CENTER,
  GET_CENTER_FAIL

  } from '../actions/types';


  const initialState = { /* The initial state of the component */
    status: '',
    message: '',
    data: {},
  
  };

  export default (state=initialState, action) => {
    switch (action.type) {
      case GET_CENTER: {
        console.log('details reducer >>>>', action.response)
        return {
          ...state,
          status: 'Success',
          message: action.response.message,
          ...action.response.data,
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