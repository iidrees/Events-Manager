import { 
  GET_EVENTS, EVENT_RETRIEVED,
   EVENT_FAILED 
  } 
from '../actions/types';

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case  GET_EVENTS:  
    console.log('I_GOT_IT_TOO')
      return action.events.data.data;
    case EVENT_FAILED:
      return err.data
    default:
     return state;
  }
}