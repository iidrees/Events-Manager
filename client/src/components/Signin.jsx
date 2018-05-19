import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { userSignin } from '../actions/userActions';

import Footer from './footer.jsx';
import { history } from '../routes';
import NavBarMain from './NavBarMain.jsx';

/**
 * A signin component
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {
  /**
   * Creates an instance of Signin.
   * @param {any} props -
   * @memberof Signin
   */
  constructor(props) {
    super(props);
    this.state = {
      token: {}
    };
  }
  /**
   * @returns {void}
   * @memberof Signin
   */
  componentDidMount() {
    let token;
    let noToken;
    try {
      token = localStorage.getItem('x-access-token');
      let decodedToken = jwt.decode(token);
      noToken = false;

      if (jwt.decode(token).admin === true) {
        history.push('/getCenters');
      } else {
        history.push('/myevents');
      }
    } catch (error) {
      return (noToken = null);
    }
  }
  /**
   * @returns {void}
   * @param {any} nextProps -
   * @memberof Signin
   */
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.authenticated) {
      if (jwt.decode(user.token).admin === true) {
        toastr.options.preventDuplicates = true;
        toastr.options.positionClass = 'toast-top-left';
        toastr.success('Signin was successful');
        history.push('/getcenters');
      }
      if (jwt.decode(user.token).role === 'User') {
        toastr.options.preventDuplicates = true;
        toastr.options.positionClass = 'toast-top-left';
        toastr.success('Signin was successful');
        history.push('/myevents');
      }
    }
  }

  /**
   * @param {any} e {event}
   * @return {*} any
   * @memberof Signin
   */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /**
   * @param {any} e {event}
   * @returns {*} any
   * @memberof Signin
   */
  onSubmit = e => {
    e.preventDefault();
    let userData = this.state;
    const { dispatch } = this.props;
    return dispatch(userSignin(userData));
  };
  /**
   * A render method that renders the HTML markup
   * @returns {component} component
   * @memberof Signin
   */
  render() {
    const { user, token1 } = this.props;
    if (user.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${user.message}`);
      user.status = '';
    }
    return (
      <div>
        <div id="form-signin" className="container">
          <form
            className="form-horizontal"
            role="form"
            method="POST"
            onSubmit={this.onSubmit}
          >
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-6">
                <h1 className="event-header">Events Manager</h1>{' '}
                <h2 className="" id="h2-signin">
                  Welcome!
                </h2>
                <hr />
                <p className="signup-text">
                  Please fill the form below to login
                </p>
                {user.status === 'Unsuccessful' && (
                  <div className="alert alert-danger" role="alert">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>
                      {user.message} {user.error}.
                    </strong>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 field-label-responsive">
                <label htmlFor="email">E-Mail Address</label>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-at" />
                    </div>
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="youremail@host.com"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-control-feedback">
                  <span className="text-danger align-middle" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 field-label-responsive">
                <label htmlFor="name">Password</label>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div
                      className="input-group-addon"
                      style={{ width: '2.6rem' }}
                    >
                      <i className="fa fa-key" />
                    </div>
                    <input
                      onChange={this.onChange}
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-control-feedback" />
              </div>
            </div>
            <div className="row" style={{ paddingTop: '1rem' }}>
              <div className="col-md-3"> </div>
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary">
                  {' '}
                  Sign-in{' '}
                  <span>
                    {' '}
                    <i className="fa fa-sign-in" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
    signedin: state.userReducer,
    user: state.userReducer
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
