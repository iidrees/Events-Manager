import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';

import { history } from '../routes';

import { signOut } from '../actions/userActions';

/**
 *
 *
 * @class NavBarMain
 * @extends {React.Component}
 */
class NavBarMain extends React.Component {
  /**
   *
   *
   * @returns {void}
   * @memberof NavBarMain
   */
  logOut = () => {
    const { dispatch } = this.props;
    return dispatch(signOut());
  };

  /**
   *
   * @returns {void}
   * @memberof NavBarMain
   */
  render() {
    const { location, match } = this.props;
    let token,
      user,
      adminLinks,
      userLinks,
      signinLink,
      signupLink,
      landing,
      decodedToken;
    try {
      token = localStorage.getItem('x-access-token');
      user = jwt.decode(token);
    } catch (error) {
      decodedToken = null;
    }

    if (token) {
      if (user.admin === true) {
        adminLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="admin-getcenters">
              <Link className="nav-link" to="/getcenters">
                Centers
              </Link>
            </li>
            <li className="nav-item" id="admin-addcenter">
              <Link className="nav-link" to="/addcenter">
                Add Center
              </Link>
            </li>
            <li className="nav-item" id="admin-logout">
              <Link
                className="nav-link"
                to="/"
                onClick={this.logOut.bind(this)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        );
      } else {
        userLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="user-getcenters">
              <Link className="nav-link" to="/getcenters">
                Centers
              </Link>
            </li>
            <li className="nav-item" id="user-addevent">
              <Link className="nav-link" to="/addevents">
                Add Events
              </Link>
            </li>
            <li className="nav-item" id="user-event">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item" id="user-myevents">
              <Link className="nav-link" to="/myevents">
                My Events
              </Link>
            </li>
            <li className="nav-item" id="user-logout">
              <Link
                className="nav-link"
                to="/"
                onClick={this.logOut.bind(this)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        );
      }
    } else {
      if (location.pathname === '/signin') {
        signinLink = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="signup">
              <Link to="/signup" className=" nav-link">
                signup
              </Link>
            </li>
          </ul>
        );
      }
      if (location.pathname === '/signup') {
        signupLink = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="signin">
              <Link to="/signin" className="nav-link">
                signin
              </Link>
            </li>
          </ul>
        );
      }
      if (location.pathname === '/') {
        landing = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/signup" className="nav-link" id="signup">
                signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link" id="signin">
                signin
              </Link>
            </li>
          </ul>
        );
      }
    }
    return (
      <header>
        {/* <!-- Start HEADER for NAVBAR --> */}
        <nav
          id="nav-bar"
          className="navbar navbar-expand-lg  fixed-top navbar-dark bg-dark justify-content-end"
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-myevents"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a id="nav-logo" className="navbar-brand" href="/">
            Events Manager!
          </a>
          <div className="collapse navbar-collapse left" id="navbar-myevents">
            {adminLinks}
            {userLinks}
            {signinLink}
            {signupLink}
            {landing}
          </div>
        </nav>
      </header> /* <!-- END HEADER FOR NAVBAR --> */
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};
const mapStateToProps = state => {
  return {
    status: state.userReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBarMain)
);
