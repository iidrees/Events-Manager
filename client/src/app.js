/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware
 } from 'redux';

import Routes from './routes';
import App from './components/App';
import NavigationBar  from './components/NavigationBar.js';


const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);


render( 
  <Provider store={store}>
      
      <App />
  </Provider>
   , document.getElementById('app'))

