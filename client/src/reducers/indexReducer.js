import { combineReducers } from 'redux';

import userReducer from './userReducer';
import centerReducer from './centerReducer';
import eventReducer from './eventReducer';
import detailsEventReducer from './detailsEventReducer';
import addCenterReducer from './addCenterReducer';
import centerDetailsReducer from './centerDetailsReducer';
import addEventReducer from './addEventReducer';
import editEventReducer from './editEventReducer';
import editCenterReducer from './editCenterReducer';
import myEventsReducer from './myEventsReducer';
import userTokenReducer from './userTokenReducer';

const indexReducer = combineReducers({
  userReducer,
  centerReducer,
  eventReducer,
  detailsEventReducer,
  addCenterReducer,
  addEventReducer,
  centerDetailsReducer,
  editEventReducer,
  editCenterReducer,
  myEventsReducer,
  userTokenReducer
});

export default indexReducer;
