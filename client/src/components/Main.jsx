/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import { Route, HashRouter, Switch, Link } from 'react-router-dom';
import { userSignupRequest } from '../actions/actions';
import Signup from './Signup.jsx';

/**
 * A Main class that helps abstract out the sign-up component
 * before introducing it to the router
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component {
  render() {
    const { userSignupRequest } = this.props
    return (
      <div className="container">
        
        <Signup userSignupRequest={userSignupRequest} />
        
      </div>
    );
  }
}

Main.prototypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect((state) => { return {} }, { userSignupRequest })(Main);