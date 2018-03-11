/*  import types  from Actions directory */
import { 
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from '../actions/types';

const initialState = []; // the initial state of the component

export default (state = initialState, action) => {
  switch (action.type) {/* reducer types listening for 
                        actions and payload in order to update store */
    case CENTERS_SUCCESS: 
      return action.centers.data.data;
    case CENTERS_ERRORS:
      return action.err.data
    default:
     return state;
  }
}
