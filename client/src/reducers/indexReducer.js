import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';
import detailsEventReducer from './detailsEventReducer';
import addCenterReducer from './addCenterReducer';
import centerDetailsReducer from './centerDetailsReducer';
import addEventReducer from './addEventReducer'

const indexReducer = combineReducers({
  userReducer,
  centerReducer,
  eventReducer,
  detailsEventReducer,
  addCenterReducer,
  addEventReducer,
  centerDetailsReducer
});

export default indexReducer;