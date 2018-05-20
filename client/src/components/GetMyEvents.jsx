import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { getMyEvents } from '../actions/eventAction';
import { history } from '../routes';

import EventComponent from './EventsComponents/EventComponent.jsx';
import MyEventHeader from './EventsComponents/MyEventHeader.jsx';

/**
 *
 *
 * @className GetEvents
 * @extends {React.Component}
 */
class GetMyEvents extends React.Component {
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
   * A method that lets a user get their events
   * @memberof GetEvents
   * @returns {any} {}
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getMyEvents());
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
    const { myEvents, status, token } = this.props;

    const { decodedToken } = token;
    let userId = decodedToken.id;

    if (decodedToken.admin) {
      return <Redirect to="/getCenters" push />;
    }

    if (myEvents.status === 'Unsuccessful') {
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
    myEvents: state.myEventsReducer,
    status: state.userReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GetMyEvents)
);
