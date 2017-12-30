import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';
import detailsEventReducer from './detailsEventReducer';
import addCenterReducer from './addCenterReducer';

const indexReducer = combineReducers({
  userReducer,
  centerReducer,
  eventReducer,
  detailsEventReducer,
  addCenterReducer
});

export default indexReducer;