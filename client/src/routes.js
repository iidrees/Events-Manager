import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import authRoute from './components/auth/authenticate.jsx';
import Getevents from './components/Getevents.jsx';
import Addevents from './components/Addevents.jsx';
import Center from './components/Center.jsx';
import Landing from './components/Landing.jsx';
import eventDetails from './components/eventDetails.jsx';
import AddCenter from './components/AddCenter.jsx';
import CenterDetails from './components/centerDetails.jsx';
import EditCenter from './components/editCenter.jsx';
import EditEvent from './components/editEvent.jsx';
import GetMyEvents from './components/GetMyEvents.jsx';

export const history = createBrowserHistory();

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/getcenters" component={Center} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/myevents" component={authRoute(GetMyEvents)} />
      <Route exact path="/events" component={authRoute(Getevents)} />
      <Route exact path="/addevents" component={authRoute(Addevents)} />
      <Route
        exact
        path="/eventdetails/:id"
        component={authRoute(eventDetails)}
      />
      <Route
        exact
        path="/centerdetails/:id"
        component={authRoute(CenterDetails)}
      />
      <Route exact path="/editcenter/:id" component={authRoute(EditCenter)} />
      <Route exact path="/editevent/:id" component={authRoute(EditEvent)} />
      <Route exact path="/addcenter" component={authRoute(AddCenter)} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};
