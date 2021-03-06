import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import authRoute from './components/auth/authRoute.jsx';
import AddEvent from './components/AddEvent.jsx';
import Center from './components/Center.jsx';
import { LandingPage } from './components/Landing.jsx';
import DetailEvent from './components/DetailEvent.jsx';
import AddCenter from './components/AddCenter.jsx';
import CenterDetails from './components/CenterDetails.jsx';
import EditCenter from './components/EditCenter.jsx';
import EditEvent from './components/EditEvent.jsx';
import GetMyEvents from './components/GetMyEvents.jsx';
import NotFound from './components/NotFound.jsx';

export const history = createBrowserHistory();

/**
 * Application client-side routes exported to the App.js the entry point
 * @returns {void}
 */
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/getcenters" component={Center} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/myevents" component={authRoute(GetMyEvents)} />
      <Route exact path="/addevents" component={authRoute(AddEvent)} />
      <Route
        exact
        path="/eventdetails/:id"
        component={authRoute(DetailEvent)}
      />
      <Route
        exact
        path="/centerdetails/:id"
        component={authRoute(CenterDetails)}
      />
      <Route exact path="/editcenter/:id" component={authRoute(EditCenter)} />
      <Route exact path="/editevent/:id" component={authRoute(EditEvent)} />
      <Route exact path="/addcenter" component={authRoute(AddCenter)} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};
