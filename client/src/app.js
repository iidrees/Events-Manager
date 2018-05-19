import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'rc-pagination/assets/index.css';

import { Routes, history } from './routes';
import './styles/scss/style.scss';
import './styles/css/style.css';
import '../../node_modules/toastr/build/toastr.min.css';
import '../../node_modules/toastr/build/toastr.min.js';

import store from './store';
import NavBarMain from './components/NavBarMain.jsx';
import Footer from './components/Footer.jsx';

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
