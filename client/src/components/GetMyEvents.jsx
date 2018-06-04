import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { Wave } from 'react-preloading-component';
import _ from 'lodash';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { getMyEvents } from '../actions/event';
import { history } from '../routes';

import EventComponent from './EventsComponents/EventComponent.jsx';
import MyEventHeader from './EventsComponents/MyEventHeader.jsx';

/**
 * Gets all user events
 * @class GetMyEvents
 * @extends {React.Component}
 */
export class GetMyEvents extends React.Component {
  /**
   * Creates an instance of Center.
   * @param {any} props -
   * @memberof GetMyEvents
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * A method that gets user events
   * @memberof GetMyEvents
   * @returns {void}
   */
  componentDidMount() {
    const { dispatch } = this.props;

    return dispatch(getMyEvents());
  }

  /**
   *
   * @returns {any} -
   * @param {any} page -
   * @memberof GetMyEvents
   */
  onChange = page => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        const { dispatch } = this.props;
        return dispatch(getMyEvents(this.state.currentPage));
      }
    );
  };

  /**
   * @returns {JSX} -
   * @memberof GetMyEvents
   */
  render() {
    const { myEvents, status, isLoading } = this.props;
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

    if (myEvents.status === 'Unsuccessful' || !myEvents.events) {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error('You currently have no events');
      myEvents.status = '';
    }

    if (myEvents.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${myEvents.message}`);
      myEvents.status = '';
    }

    return (
      <div>
        {_.isEmpty(myEvents.events) ? (
          //TODO: I still need to test this
          <h1
            style={{
              paddingTop: '60px',
              fontSize: '20px'
            }}
          >
            <div
              className="alert alert-success"
              role="alert"
              style={{ textAlign: 'center' }}
            >
              <strong style={{ textAlign: 'center' }}>You Have No Event</strong>
            </div>
          </h1>
        ) : (
          <div>
            <div className="container" id="myevent">
              <div className="row">
                <MyEventHeader myEvents={myEvents} />
                <EventComponent
                  onChange={this.onChange}
                  userId={userId}
                  events={myEvents}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 paginator">
              {
                <Pagination
                  onChange={this.onChange}
                  current={this.state.currentPage}
                  total={myEvents.count}
                  locale={{ items_per_page: 'items' }}
                />
              }
            </div>
            <div id="card-body1" />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

/**
 *
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
 *
 * Maps state and the store to props
 * @param {any} state -
 * @returns {void}
 */
const mapStateToProps = state => {
  return {
    myEvents: state.myEventsReducer,
    status: state.userReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GetMyEvents)
);
