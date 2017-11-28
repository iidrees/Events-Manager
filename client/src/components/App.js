import React from 'react';
import { Route, HashRouter, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationBar  from './NavigationBar.js';
import Main from './Main.jsx'
import Getevents from './Getevents.jsx'
import Footer from './footer.jsx';
import  './scss/style.scss';
import  './css/style.css';

/**
 * This is the App component that helps
 * abstract out the implementation of the sign-up component while using the react-router-dom
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    const { userSignupRequest } = this.props
    return (
      <div className="container">
        <NavigationBar />
        <BrowserRouter>
          <Switch>            
            <Route exact path='/users' component={Main} />
            <Route exact path='/getEvents' component={Getevents} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
export default App;