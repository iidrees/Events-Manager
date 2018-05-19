import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { addCenter, imageUpload } from '../actions/addCentersAction';
import { centerDetails } from '../actions/centerDetailsAction';
import { history } from '../routes';
import AddCenterComponent from './CentersComponents/AddCenterComponent.jsx';
import AddCenterHeaderComponent from './CentersComponents/AddCenterHeaderComponent.jsx';

/**
 *
 * @param {event} e {e}
 * @class AddCenter
 * @extends {React.Component}
 */
class AddCenter extends React.Component {
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let centerData = this.state;
    const { dispatch } = this.props;
    if (
      centerData.imgFile === null ||
      centerData.imgFile === undefined ||
      !centerData.imgFile
    ) {
      return dispatch(addCenter(centerData));
    }
    return dispatch(imageUpload(centerData));
  };

  /**
   * @param {event} event {event}
   * @returns {any} any
   * @memberof AddCenter
   */
  onImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let imgFile = event.target.files[0];

    try {
      if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png') {
        reader.onloadend = () => {
          this.setState({
            imgFile: imgFile,
            imgUrl: reader.result
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
   *
   *
   * @returns {String} return the HTML markup to be rendered
   * @memberof AddCenter
   */
  render() {
    const { createCenter, user } = this.props;

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
    if (createCenter.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${createCenter.message}`);
      createCenter.status = '';
    }
    if (createCenter.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${createCenter.message}`);
      createCenter.status = '';
      return <Redirect to="/getCenters" push />;
    }
    return (
      <div>
        <div className="container" id="add-centers">
          <div className="row">
            <AddCenterHeaderComponent createCenter={createCenter} />
            <AddCenterComponent
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onImageChange={this.onImageChange}
            />
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
    createCenter: state.addCenterReducer,
    user: state.userReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddCenter)
);
