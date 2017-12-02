import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Getevents from './components/Getevents.jsx';
import Myevents from './components/Myevents.jsx';
import Center from './components/Center.jsx';


export const history = createBrowserHistory();

export const Routes = () => {
  return (
      <Switch>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/getcenters' component={Center}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/' component={Getevents}/>
        <Route exact path='/myevents' component={Myevents} />
      </Switch>
  )
}