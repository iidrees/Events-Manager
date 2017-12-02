/*  Import dependencies */
import { createStore, applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';

import indexReducer from './reducers/indexReducer';



const store = createStore( // create store and make state available to all components
  indexReducer,
  applyMiddleware(thunk)
);


export default store;
