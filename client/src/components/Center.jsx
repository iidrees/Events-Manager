import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import decode from 'jwt-decode';

import Footer from './footer.jsx';
import getCenters from '../actions/getCentersAction';
import NavBarMain from './NavBarMain.jsx';
import { history } from '../routes';

/**
 * @class Center
 * @extends {React.Component}
 */
class Center extends React.Component {
  /**
   * Creates an instance of Center.
   * @param {any} props -
   * @memberof Center
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      userName: '',
      isAdmin: false
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @returns {*} function
   * @memberof Center
   */
  componentDidMount() {
    const { dispatch, currentPage } = this.props;
    return dispatch(getCenters(currentPage));
  }

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
        return dispatch(getCenters(this.state.currentPage));
      }
    );
  };

  /**
   * @returns {*} any
   * @memberof Center
   */
  render() {
    const { centers, user, currentPage, itemsPerPage } = this.props;
    let userId, token, decoded;
    try {
      token = localStorage.getItem('x-access-token');
      userId = decode(token).id;
    } catch (error) {
      decoded = null;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container" id="event-page">
              {/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
              <div className="row">
                <div className="col-sm-12">
                  <h1 className=" head1 text-center" id="centerid" />
                  <p id="p-head" className="head1 text-center">
                    Are you looking for a location to host your events? <br />
                    Checkout these popular event centers in Lagos
                  </p>
                  <hr />
                </div>
              </div>
            </div>
            {/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
            {centers.status === 'Success' && (
              <div className="alert alert-success" role="alert">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>{centers.message}.</strong>
              </div>
            )}
            {centers.status === 'Unsuccessful' && (
              <div className="alert alert-danger" role="alert">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>{centers.message}</strong>
                <span> </span>
                <strong>{centers.error}.</strong>
              </div>
            )}

            <div className="container" id="centerbottom">
              <div className="row">
                {centers.centers.map(center => {
                  return (
                    <div
                      className="col-sm-12 col-md-6 col-lg-4"
                      key={center.id}
                    >
                      <div className="card-deck cont-body" id="card-center1">
                        <div
                          className="card"
                          id="card1"
                          style={{ width: '18rem' }}
                        >
                          {userId !== event.userId ? (
                            <img
                              className="card-img-top img-fluid"
                              src={`${center.imgUrl}`}
                              alt="Card image cap"
                            />
                          ) : (
                            <Link to={`/centerdetails/${center.id}`}>
                              <img
                                className="card-img-top img-fluid"
                                src={`${center.imgUrl}`}
                                alt="Center image"
                              />
                            </Link>
                          )}
                          <div
                            className="card-body"
                            style={{ borderBottom: 'solid grey 0.5px' }}
                          >
                            <h5 className="card-title even-font">
                              <span className="all-centers-font">Center: </span>
                              {center.name}
                            </h5>

                            <p className=" location-font">
                              <span className="all-centers-font">
                                LOCATION:{' '}
                              </span>
                              {center.location}
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
        <div className="col-sm-12 col-md-6 col-lg-4 paginator">
          {
            <Pagination
              onChange={this.onChange}
              current={this.state.currentPage}
              className="pagination"
              total={centers.count}
              locale={{ items_per_page: 'items' }}
            />
          }
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
    centers: state.centerReducer,
    user: state.userReducer
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Center));
