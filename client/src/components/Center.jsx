import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import _ from 'lodash';

import Footer from './Footer.jsx';
import getCenters from '../actions/getCenters';
import NavBarMain from './NavBarMain.jsx';
import { history } from '../routes';
import GetCentersComponent from './CentersComponents/GetCentersComponent.jsx';
import GetCentersHeaderComponent from './CentersComponents/GetCentersHeaderComponent.jsx';

/**
 * @class Center
 * @extends {React.Component}
 */
export class Center extends React.Component {
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
      userId = jwt.decode(token).id;
    } catch (error) {
      decoded = null;
    }

    if (centers.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(
        'No Event Centers Available at the Moment, check back later'
      );
      centers.status = '';
    }

    if (_.isEmpty(centers)) {
      return (
        <h1
          style={{
            paddingTop: '200px',
            marginLeft: '300px',
            fontSize: '70px'
          }}
        >
          No Centers Available
        </h1>
      );
    }
    return (
      <div>
        <div className="container">
          <div>
            <GetCentersHeaderComponent centers={centers} />
            <GetCentersComponent centers={centers} userId={userId} />
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
 * Maps state to props
 * @param {any} state -
 * @returns {void}
 */
const mapStateToProps = state => {
  return {
    centers: state.centerReducer,
    user: state.userReducer,
    token: state.userTokenReducer
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Center)
);
