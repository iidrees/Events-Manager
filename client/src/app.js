import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'rc-pagination/assets/index.css';
import toastr from 'toastr';
import { Routes, history } from './routes';
import { SET_TOKEN, REMOVE_TOKEN } from './actions/types';
import './styles/scss/style.scss';
import './styles/css/style.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../../node_modules/toastr/build/toastr.min.js';

import store from './store';
import NavBarMain from './components/NavBarMain.jsx';
import Footer from './components/Footer.jsx';

//
if (localStorage.getItem('x-access-token')) {
  const decodedToken = jwt.decode(localStorage.getItem('x-access-token'));

  store.dispatch({
    type: SET_TOKEN,
    decodedToken
  });
} else {
  toastr.options.preventDuplicates = true;
  toastr.options.positionClass = 'toast-top-left';
  toastr.info('Please login again to continue');
  history.push('/');
}

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBarMain />
        <Routes />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
