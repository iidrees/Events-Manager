/* Import action types from the action type module */
import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED, 
   ADD_EVENT,
   ADD_IMG_FAIL
  } from '../actions/types';

const initialState = { /* The initial state of the component */
  status: '',
  message: '',
  events: [],
  error: ''
}; 

export default (state = initialState, action) => {
  switch (action.type) {/* reducer listening for actions and update the store */
    case  GET_EVENTS: {
      
      return { 
        ...state,
        status: 'Success',
        message: action.events.message,
        events: [...action.events.data.rows],
        count: action.events.data.count
      }
    }
    case EVENT_FAILED: {
      return  {
        ...state,
        status: 'Unsuccessful' || undefined,
        message: action.err.message,
        error: action.err.error
      }
    }
    case ADD_IMG_FAIL: {
      return {
        ...state,
        status: 'Unsuccessful',
        error: action.error

      }
    }
    default:
     return state;
  }
}
