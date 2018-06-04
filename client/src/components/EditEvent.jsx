import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { Wave, Third } from 'react-preloading-component';
import _ from 'lodash';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { editEvent, imageUpload } from '../actions/editEvent';
import getCenters from '../actions/getCenters';
import { detailEvent } from '../actions/event';
import { history } from '../routes';
import EditEventComponent from './EventsComponents/EditEventComponent.jsx';
import EditEventHeaderComponent from './EventsComponents/EditEventHeaderComponent.jsx';
/**
 * @param {event} event - Object
 * @class EditEvents
 * @extends { React.Component }
 */
export class EditEvent extends React.Component {
  /**
   * Creates an instance of EditEvent.
   * @param {any} props -
   * @memberof EditEvent
   */
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        ...this.props.event
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * allows the component renders before making a request for the centers
   * @returns {JSON} Object
   * @memberof EditEvent
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }

  /**
   * @returns {void}
   * @param {event} event -
   * @memberof EditEvent
   */
  onChange = event => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        [event.target.name]: event.target.value
      }
    });
  };

  /**
   * @return {void}
   * @param {event} event -
   * @memberof EditEvent
   */
  onSubmit = event => {
    event.preventDefault();
    let { eventData } = this.state;
    const { dispatch } = this.props;
    if (
      eventData.imgFile === null ||
      eventData.imgFile === undefined ||
      !eventData.imgFile
    ) {
      return dispatch(editEvent(eventData, eventData.center));
    }
    return dispatch(imageUpload(eventData, this.props.match.params.id));
  };

  /**
   * @return {void}
   * @param {event} event -
   * @memberof EditEvent
   */
  onImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let imgFile = event.target.files[0];

    try {
      if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png') {
        reader.onloadend = () => {
          this.setState({
            eventData: {
              ...this.state.eventData,
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
   * @returns {any} -
   * @memberof EditEvents
   */
  render() {
    const { centers, event, user, editEvents } = this.props;

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
    if (editEvents.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${editEvents.message}`);
      editEvents.status = '';
    }
    if (editEvents.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${editEvents.message}`);
      editEvents.status = '';
      return <Redirect to="/myevents" push />;
    }
    if (editEvents.isLoading) {
      editEvents.isLoading = false;
      return (
        <div style={{ paddingTop: '350px' }}>
          <Wave />
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <EditEventHeaderComponent />
          <EditEventComponent
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            centers={centers}
            onImageChange={this.onImageChange}
            {...this.state}
            editEvents={editEvents}
          />
          {/* <!-- End container for the Head section --> */}
        </div>
        <Footer />
      </div>
    );
  }
}

/**
 *
 * maps dispatch to props making it possibele to make
 * action calls from the component
 * @param {any} dispatch -
 * @returns {void}
 */
const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};

/**
 *
 * Maps the state to props allowing the component have access to the store
 * @param {any} state - the store
 * @returns {void}
 */
const mapStateToProps = state => {
  return {
    addevents: state.eventReducer,
    user: state.userReducer,
    centers: state.centerReducer,
    event: state.detailsEventReducer,
    editEvents: state.editEventReducer,
    token: state.userTokenReducer
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEvent)
);
