import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { Wave, Third } from 'react-preloading-component';
import _ from 'lodash';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { editCenter, imageUpload } from '../actions/editCenterAction';
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
    if (
      centerData.imgFile === null ||
      centerData.imgFile === undefined ||
      !centerData.imgFile
    ) {
      return dispatch(editCenter(this.props.match.params.id, centerData));
    }
    return dispatch(imageUpload(this.props.match.params.id, centerData));
  };
  onImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let imgFile = event.target.files[0];

    try {
      if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png') {
        reader.onloadend = () => {
          this.setState({
            centerData: {
              ...this.state.centerData,
              imgFile: imgFile,
              imgUrl: reader.result
            }
          });
        };
        reader.readAsDataURL(imgFile);
      } else {
        alert('Please upload an image with the .jpeg or .png file format');
      }
    } catch (error) {
      alert('Please upload an image with the .jpeg or .png file format');
    }
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

    if (updateCenter.isLoading) {
      updateCenter.isLoading = false;
      return (
        <div style={{ paddingTop: '350px' }}>
          <Wave />
        </div>
      );
    }
    return (
      <div>
        {_.isEmpty(center.center) ? (
          <Redirect to="/getCenters" push />
        ) : (
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
                    onImageChange={this.onImageChange}
                    {...this.state}
                    {...center}
                  />
                  {/* <!-- End Container ADD EVENTS FORM --> */}
                </div>
              </div>
            </div>
          </div>
        )}
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
    user: state.userReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCenter)
);
