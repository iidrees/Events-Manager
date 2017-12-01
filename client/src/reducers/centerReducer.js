import { 
  GET_ALL_CENTERS,
  CENTERS_SUCCESS,
  CENTERS_ERRORS
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CENTERS: 
      return {
        ...state, 
      }
    case CENTERS_SUCCESS: 
      return action.centers.data.data;
    case CENTERS_ERRORS:
      return err.data
    default:
     return state;
  }
}
