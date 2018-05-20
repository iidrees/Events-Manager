import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { editEvent } from '../actions/editEventAction';
import getCenters from '../actions/getCentersAction';
import { detailEvent } from '../actions/eventAction';
import { history } from '../routes';
import EditEventComponent from './EventsComponents/EditEventComponent.jsx';
import EditEventHeaderComponent from './EventsComponents/EditEventHeaderComponent.jsx';
/**
 * @param {event} event - Object
 * @class Addevents
 * @extends { React.Component }
 */
class EditEvent extends React.Component {
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
   * @returns {JSON} Object
   * @memberof EditEvent
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }

  onChange = event => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        [event.target.name]: event.target.value
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    let { eventData } = this.state;
    const { dispatch } = this.props;
    return dispatch(editEvent(eventData, this.props.match.params.id));
  };

  /**
   * @returns {any} -
   * @memberof Addevents
   */
  render() {
    const { centers, event, user, editEvents, token } = this.props;
    const { decodedToken } = token;
    let userId = decodedToken;

    if (decodedToken.admin) {
      return <Redirect to="/getCenters" push />;
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

    return (
      <div>
        <div className="container">
          <EditEventHeaderComponent editEvents={editEvents} />
          <EditEventComponent
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            centers={centers}
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

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};
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
