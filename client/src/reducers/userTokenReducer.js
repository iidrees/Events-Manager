import { SET_TOKEN, REMOVE_TOKEN } from '../actions/types';

export default (state = { decodedToken: null }, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        decodedToken: action.decodedToken
      };
    }

    default:
      return state;
  }
};
