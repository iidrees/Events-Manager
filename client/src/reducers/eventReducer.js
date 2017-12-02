/* Import action types from the action type module */
import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED 
  } 
from '../actions/types';

const initialState = []; // initial state of the component

export default (state = initialState, action) => {
  switch (action.type) {/* reducer listening for actions and update the store */
    case  GET_EVENTS:
      return action.events.data.data;
    case EVENT_FAILED:
      return action.err.data
    default:
     return state;
  }
}