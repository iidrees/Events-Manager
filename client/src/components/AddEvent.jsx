import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import validator from 'validator';
import { Wave, Third } from 'react-preloading-component';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { addEvent, imageUpload } from '../actions/addEvent';
import getCenters from '../actions/getCenters';
import { history } from '../routes';
import AddEventComponent from './EventsComponents/AddEventComponent.jsx';
import AddEventHeaderComponent from './EventsComponents/AddEventHeaderComponent.jsx';

/**
 * @param {event} event {events}
 * @class Addevents
 * @extends { React.Component }
 */
class AddEvent extends React.Component {
  /**
   * @returns {void}
   * @param {event} event -
   * @memberof AddEvent
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * @returns {void}
   * @param {event} event -
   * @memberof AddEvent
   */
  onSubmit = event => {
    event.preventDefault();
    let eventData = this.state;

    const { dispatch } = this.props;
    if (
      eventData.imgFile === null ||
      eventData.imgFile === undefined ||
      !eventData.imgFile
    ) {
      return dispatch(addEvent(eventData, eventData.center));
    }
    return dispatch(imageUpload(eventData, eventData.center));
  };

  /**
   * @returns {void}
   * @param {event} event -
   * @memberof AddEvent
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
   * @returns {JSON} An array of centers
   * @memberof Addevents
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }

  /**
   * @returns {any} -
   * @memberof Addevents
   */
  render() {
    const { user, centers, event } = this.props;
    let userId, token, decoded;
    try {
      token = localStorage.getItem('x-access-token');

      userId = jwt.decode(token).id;

      if (jwt.decode(token).admin) {
        return <Redirect to="/getCenters" push />;
      }
    } catch (error) {
      decoded = null;
    }

    if (event.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${event.message}`);
      event.status = '';
    }
    if (event.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${event.message}`);
      event.status = '';
      return <Redirect to="/myevents" push />;
    }
    if (event.isLoading) {
      event.isLoading = false;
      return (
        <div style={{ paddingTop: '350px' }}>
          <Wave />
        </div>
      );
    }
    return (
      <div>
        <div className="container" id="add-events">
          <div className="row">
            <AddEventHeaderComponent />
            <div className="container">
              {/* <!-- Start container for Add Form --> */}
              <div className="row">
                <AddEventComponent
                  {...centers}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  onImageChange={this.onImageChange}
                />
              </div>
            </div>
          </div>
          {/* <!-- End container for the Head section --> */}
        </div>
      </div>
    );
  }
}

/**
 * Maps dispatch to props
 * @param {any} dispatch -
 * @returns {void}
 */
const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};

/**
 * Maps state to props and the store is exposed to the component
 *
 * @param {any} state -
 * @returns {void}
 */
const mapStateToProps = state => {
  return {
    event: state.addEventReducer,
    user: state.userReducer,
    centers: state.centerReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEvent)
);
