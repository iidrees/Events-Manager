import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { addEvent, imageUpload } from '../actions/addEventActions';
import getCenters from '../actions/getCentersAction';
import { history } from '../routes';
import AddEventComponent from './EventsComponents/AddEventComponent.jsx';
import AddEventHeaderComponent from './EventsComponents/AddEventHeaderComponent.jsx';

/**
 * @param {event} event {events}
 * @class Addevents
 * @extends { React.Component }
 */
class AddEvent extends React.Component {
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
   * @param {e} e {event}
   * @returns {any} any
   * @memberof AddEvents
   */
  onImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let imgFile = e.target.files[0];

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
   * @returns {JSON} An array of centers
   * @memberof Addevents
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }

  /**
   *
   *
   * @returns {any} -
   * @memberof Addevents
   */
  render() {
    const { user, centers, event, token } = this.props;

    const { decodedToken } = token;
    let userId = decodedToken.id;

    if (decodedToken.admin) {
      return <Redirect to="/getCenters" push />;
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
        <Footer />
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
    event: state.addEventReducer,
    user: state.userReducer,
    centers: state.centerReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEvent)
);
