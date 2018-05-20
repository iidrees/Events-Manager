import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { userSignup } from '../actions/userActions';
import { history } from '../routes';
import NavBarMain from './NavBarMain.jsx';
/**
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
   * @returns {void}
   * @memberof Signup
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
   * @param {event} event -
   * @returns {JSON} JSON -
   * @memberof Signup
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * @param {event} event -
   * @returns {JSON} JSON
   * @memberof Signup
   */
  onSubmit = event => {
    event.preventDefault();
    let userData = this.state;
    const { dispatch } = this.props;
    return dispatch(userSignup(userData));
  };

  /**
   * @returns {JSX} JSX
   * @memberof Signup
   */
  render() {
    const { user } = this.props;

    if (user.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${user.message}`);
      user.status = '';
      return <Redirect to="/myevents" push />;
    }
    if (user.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${user.message}<br/>${user.error}`);
      user.status = '';
    }
    return (
      <div>
        <div className="container" id="form-signup">
          <form
            id="form-signup"
            className="form-horizontal"
            role="form"
            method="POST"
            onSubmit={this.onSubmit}
          >
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-6">
                <h1 className="event-header">Events Manager</h1>{' '}
                <h3 className="" id="h3-signup">
                  Let's get started
                </h3>
                <hr />
                <p className="signup-text">
                  enter your name, email and password to Sign-up{' '}
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
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-user" />
                    </div>
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      autoFocus
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3" />
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
                      autoComplete="email address"
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="youremail@host.com"
                      required
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
                <label htmlFor="password">Password</label>
              </div>
              <div className="col-md-6">
                <div className="form-group has-danger">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-key" />
                    </div>
                    <input
                      onChange={this.onChange}
                      type="password"
                      autoComplete="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 field-label-responsive">
                <label htmlFor="password">Confirm Password</label>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">
                      <i className="fa fa-repeat" />
                    </div>
                    <input
                      onChange={this.onChange}
                      type="password"
                      autoComplete="confirm-password"
                      name="confirmPassword"
                      className="form-control"
                      id="password-confirm"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3" />
              <br />
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary">
                  {' '}
                  Sign-up{' '}
                  <span>
                    <i className="fa fa-user-plus" />
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

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
