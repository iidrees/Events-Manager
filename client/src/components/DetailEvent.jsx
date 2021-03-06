import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import _ from 'lodash';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { detailEvent } from '../actions/event';
import deleteEvent from '../actions/deleteEvent';
import { history } from '../routes';
import DetailsComponent from './EventsComponents/DetailsComponent.jsx';
import DetailsHeaderComponent from './EventsComponents/DetailsHeaderComponent.jsx';

/**
 *
 *
 * @class DetailEvents
 * @extends {React.Component}
 */
export class DetailEvent extends React.Component {
  /**
   *Creates an instance of DetailEvent.
   * @param {*} props -
   * @memberof DetailEvent
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.onDelete = this.onDelete.bind(this);
  }
  /**
   * A method that lets a user get their events
   * @memberof DetailEvent
   * @returns {any} dispatched actions
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(detailEvent(this.props.match.params.id));
  }

  /**
   * @param {events} events is the event
   * @returns {action} returns a dispatched action
   * @memberof DetailEvent
   */
  onDelete = events => {
    events.preventDefault();
    let { event } = this.props;
    const { dispatch } = this.props;
    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = 'toast-top-left';
    toastr.success('Event Deleted Successfully');
    dispatch(deleteEvent(event.id));
    return this.props.history.push('/myevents');
  };

  /**
   *
   *
   * @returns {*} JSX
   * @memberof DetailEvent
   */
  render() {
    const { event, user } = this.props;

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
      toastr.error(`${event.message} Event not available`);
      event.status = '';
    }

    return (
      <div>
        {_.isEmpty(event.message) && event.status !== 'Success' ? (
          <Redirect to="/myevents" push />
        ) : (
          <div>
            {' '}
            <div className="container" id="myevent">
              <div className="row">
                <div className="container">
                  {/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
                  <div className="row">
                    <DetailsHeaderComponent event={event} />
                  </div>
                  <DetailsComponent event={event} onDelete={this.onDelete} />
                </div>
                {/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
              </div>
            </div>
            <div id="card-body1" />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

/**
 * maps dispatch to props exposing the function to the component
 * @param {any} dispatch -
 * @returns {void}
 */
const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  };
};

/**
 * Maps state to props exposing the store to the component
 * @param {any} state -
 * @returns {void}
 */
const mapStateToProps = state => {
  return {
    event: state.detailsEventReducer,
    user: state.userReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailEvent)
);
