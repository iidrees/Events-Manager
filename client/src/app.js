import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Getevents from './components/Getevents.jsx';
import Myevents from './components/Myevents.jsx';
import  './styles/scss/style.scss';
import  './styles/css/style.css';



import store from './store'

export const history = createBrowserHistory();

export const Routes = () => {
  return (
      <Switch>
        <Route exact path='/' component={Signup}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/getevents' component={Getevents}/>
        <Route exact path='/myevents' component={Myevents} />
      </Switch>
  )
}


render( 
  <Provider store={store}> 
    <Router history={history} >
			<Routes />
    </Router>
  </Provider>
   , document.getElementById('app'))

