import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import decode from 'jwt-decode';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { getEvents } from '../actions/eventAction';
import { history } from '../routes';

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
      userId = decode(token).id;
    } catch (error) {
      decoded = null;
    }

    return (
      <div>
        <div className="container" id="myevent">
          <div className="row">
            <div className="container">
              {/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
              <div className="row">
                <div className="col-sm-12">
                  <h1 className=" head1 text-center">My Events</h1>
                  <p id="p-head" className="head1 text-center">
                    Check your pending events below.
                  </p>
                  <hr />
                  {events.status === 'Success' && (
                    <div className="alert alert-success" role="alert">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>{events.message}.</strong>
                    </div>
                  )}
                  {events.status === 'Unsuccessful' && (
                    <div className="alert alert-danger" role="alert">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>{events.message}.</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
            <div className="container">
              <div className="row">
                {events.events.map(event => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4" key={event.id}>
                      <div className="card-deck cont-body" id="card-body">
                        <div className="card" style={{ width: '18rem' }}>
                          {userId !== event.userId ? (
                            <img
                              className="card-img-top img-fluid"
                              src={`${event.imgUrl}`}
                              alt="Card image cap"
                            />
                          ) : (
                            <Link to={`/eventdetails/${event.id}`}>
                              <img
                                className="card-img-top img-fluid"
                                src={`${event.imgUrl}`}
                                alt="Card image cap"
                              />
                            </Link>
                          )}
                          <div
                            className="card-body"
                            style={{ borderBottom: 'solid grey 0.5px' }}
                          >
                            <h5 className="card-title even-font">
                              <span className="">Event: </span>
                              {event.title}
                            </h5>
                            <p className=" even-font">
                              <span>LOCATION: </span>
                              {event.center}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
