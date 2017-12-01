import { createStore, applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';

import indexReducer from './reducers/indexReducer';





const store = createStore(
  indexReducer,
  applyMiddleware(thunk)
);


export default store;
