/* Import action types from the action type module */
import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED, 
   ADD_EVENT
  } from '../actions/types';

const initialState = { /* The initial state of the component */
  status: '',
  message: '',
  data: []
}; 

export default (state = initialState, action) => {
  switch (action.type) {/* reducer listening for actions and update the store */
    case  GET_EVENTS: {
    console.log('this is the reducer',action.events.data);
      return { 
        ...state,
        status: 'Success',
        message: action.events.message,
        ...action.events.data
      }
    }
    case EVENT_FAILED: {
      console.log('this is the failed reducer',action.err.response.data)
      return  {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.err.response.data.message
      }
    }
    default:
     return state;
  }
}
