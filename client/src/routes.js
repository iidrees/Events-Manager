import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Getevents from './components/Getevents.jsx';
import Addevents from './components/Addevents.jsx';
import Center from './components/Center.jsx';
import Landing from './components/Landing.jsx';
import eventDetails from './components/eventDetails.jsx';
import AddCenter from './components/AddCenter.jsx';
import CenterDetails from './components/centerDetails.jsx';
import EditCenter from './components/editCenter.jsx';

export const history = createBrowserHistory();

export const Routes = () => {
  return (
      <Switch>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/getcenters' component={Center}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/getevents' component={Getevents}/>
        <Route exact path='/addevents' component={Addevents} />
        <Route exact path='/eventdetails/:id' component={eventDetails}/>
        <Route exact path='/centerdetails/:id' component={CenterDetails}/>
        <Route exact path='/editcenter/:id' component={EditCenter}/>
        <Route exact path='/addcenter' component={AddCenter} />
        <Route exact path='/' component={Landing} />
      </Switch>
  )
}