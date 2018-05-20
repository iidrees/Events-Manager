import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { getEvents } from '../actions/eventAction';
import { history } from '../routes';

import EventComponent from './EventsComponents/EventComponent.jsx';
import GetEventsHeaderComponent from './EventsComponents/GetEventsHeaderComponent.jsx';

/**
 *
 *
 * @className GetEvents
 * @extends {React.Component}
 */
class GetEvents extends React.Component {
  /**
   * Creates an instance of Center.
   * @param {any} props -
   * @memberof GetEvents
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
   * A method that lets a user get their events
   * @memberof GetEvents
   * @returns {any} {}
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getEvents());
  }

  /**
   *
   *
   * @returns {*} method
   * @memberof GetEvents
   */

  /**
   *
   * @returns {any} -
   * @param {any} page -
   * @memberof Center
   */
  onChange = page => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        const { dispatch } = this.props;
        return dispatch(getEvents(this.state.currentPage));
      }
    );
  };

  /**
   * @returns {JSX} -
   * @memberof GetEvents
   */
  render() {
    const { events, status } = this.props;
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
    if (events.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error('You currently have no events');
      events.status = '';
    }
    if (events.status === 'Success') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.success(`${events.message}`);
      events.status = '';
    }
    return (
      <div>
        <div className="container" id="myevent">
          <div className="row">
            {/* <!-- START BODY-HEADER --> */}
            <GetEventsHeaderComponent events={events} />
            {/* <!-- END BODY-HEADER --> */}
            <EventComponent
              onChange={this.onChange}
              userId={userId}
              events={events}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 paginator ">
          {
            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              total={events.count}
              locale={{ items_per_page: 'items' }}
            />
          }
        </div>
        <div id="card-body1" />
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
    events: state.eventReducer,
    status: state.userReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GetEvents)
);
