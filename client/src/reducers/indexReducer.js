import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';

const indexReducer = combineReducers({
  userReducer,
  centerReducer,
  eventReducer
});

export default indexReducer;