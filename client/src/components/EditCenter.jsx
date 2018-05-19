import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { editCenter } from '../actions/editCenterAction';
import { centerDetails } from '../actions/centerDetailsAction';
import { history } from '../routes';
import EditCenterComponent from './CentersComponents/EditCenterComponent.jsx';
/**
 * @class EditCenter
 * @extends {React.Component}
 */
class EditCenter extends React.Component {
  /**
   * Creates an instance of EditCenter.
   * @param {any} props -
   * @memberof EditCenter
   */
  constructor(props) {
    super(props);
    this.state = {
      centerData: {
        ...this.props.center.center
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {event} event -
   * @return {void}
   * @memberof EditCenter
   */
  onChange = event => {
    this.setState({
      centerData: {
        ...this.state.centerData,
        [event.target.name]: event.target.value
      }
    });
  };

  /**
   *@returns {void}
   *@param {event} event -
   * @memberof EditCenter
   */
  onSubmit = event => {
    event.preventDefault();
    let { centerData } = this.state;

    const { dispatch } = this.props;
    return dispatch(editCenter(this.props.match.params.id, centerData));
  };

  /**
   * @returns {void}
   * @memberof EditCenter
   */
  render() {
    const { user, center, updateCenter } = this.props;
    let userId, token, decoded;
    try {
      token = localStorage.getItem('x-access-token');

      userId = jwt.decode(token).id;

      if (!jwt.decode(token).admin) {
        return <Redirect to="/myevents" push />;
      }
    } catch (error) {
      decoded = null;
    }
    if (updateCenter.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${updateCenter.message}`);
      updateCenter.status = '';
    }
    if (updateCenter.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${updateCenter.message}`);
      updateCenter.status = '';
      return <Redirect to="/getCenters" push />;
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container" id="add-center-header">
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="text-center head-1" id="admin-add-head">
                    Edit Centers Below{' '}
                  </h1>
                  <p className="head-para text-center" />
                  <hr />
                </div>
              </div>
            </div>

            <div className="container">
              {/* <!-- Start container for Add Form --> */}
              <div className="row">
                <EditCenterComponent
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  {...this.state}
                  {...center}
                />
                {/* <!-- End Container ADD EVENTS FORM --> */}
              </div>
            </div>
          </div>
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
    center: state.centerDetailsReducer,
    updateCenter: state.editCenterReducer,
    user: state.userReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCenter)
);
