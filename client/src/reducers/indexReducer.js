import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';
import detailsEventReducer from './detailsEventReducer';

const indexReducer = combineReducers({
  userReducer,
  centerReducer,
  eventReducer,
  detailsEventReducer
});

export default indexReducer;