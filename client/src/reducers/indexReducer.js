import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';

const indexReducer = combineReducers({
  userReducer,
  centerReducer
});

export default indexReducer;