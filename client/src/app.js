import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'rc-pagination/assets/index.css';

import  { Routes, history } from './routes';
import  './styles/scss/style.scss';
import  './styles/css/style.css';

import store from './store'


render( 
  <Provider store={store}> 
    <Router history={history} >
			<Routes />
    </Router>
  </Provider>
   , document.getElementById('app'))

