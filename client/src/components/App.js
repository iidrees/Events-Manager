import React from 'react';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import { userSignupRequest } from '../actions/actions';
import NavigationBar  from './NavigationBar.js';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import Getevents from './Getevents.jsx';
import Myevents from './Myevents.jsx';
import Footer from './footer.jsx';
import  './scss/style.scss';
import  './css/style.css';

class App extends React.Component {
  render() {
    const { userSignupRequest } = this.props
    return (
      <div className="container">
        <NavigationBar />
        <Signup userSignupRequest={userSignupRequest} />
        <Footer />
      </div>
    );
  }
}

App.prototypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect((state) => { return {} }, { userSignupRequest })(App);