import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Pagination from 'rc-pagination';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';

import NavBarMain from './NavBarMain.jsx';
import Footer from './Footer.jsx';
import { deleteCenter } from '../actions/deleteCenterAction';
import { centerDetails } from '../actions/centerDetailsAction';
import { history } from '../routes';
import CenterDetailsComponent from './CentersComponents/CenterDetailsComponent.jsx';
import CenterDetailsBodyComponent from './CentersComponents/CenterDetailsBodyComponent.jsx';

/**
 *
 *
 * @class CenterDetails
 * @extends {React.Component}
 */
class CenterDetails extends React.Component {
  /**
   * Creates an instance of Center.
   * @param {any} props -
   * @memberof Center
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @returns {JSON} JSON
   * @memberof CenterDetails
   */
  componentDidMount() {
    let { dispatch, currentPage } = this.props;

    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = 'toast-top-left';
    toastr.success('This is the details of center');

    return dispatch(
      centerDetails(this.props.match.params.id, this.state.currentPage)
    );
  }

  /**
   *
   * @returns {any} -
   * @param {any} page -
   * @memberof CenterDetails
   */
  onChange = page => {
    this.setState({
      currentPage: page
    });
    const { dispatch } = this.props;

    return dispatch(
      centerDetails(this.props.match.params.id, this.state.currentPage)
    );
  };

  /**
   *
   * @returns {null} null
   * @param {event} event -
   * @memberof CenterDetails
   */
  onDelete = event => {
    event.preventDefault();
    let { center } = this.props;
    const { dispatch } = this.props;

    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = 'toast-top-left';
    toastr.success('Center Deleted Successfully');
    dispatch(deleteCenter(center.center.id));
    return this.props.history.push('/getCenters');
  };
  /**
   *
   *
   * @returns {JSX} JSX
   * @memberof CenterDetails
   */
  render() {
    const { center, user } = this.props;
    let userId, token, decoded;
    try {
      token = localStorage.getItem('x-access-token');

      userId = jwt.decode(token).id;

      if (!jwt.decode(token).admin) {
        return <Redirect to="/myevents" push />;
      }
    } catch (error) {
      decoded = null;
    }

    if (center.status === 'Unsuccessful') {
      toastr.options.preventDuplicates = true;
      toastr.options.positionClass = 'toast-top-left';
      toastr.error(`${center.message}`);
      center.status = '';
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container" id="center-details-header">
              {/* START PAGE HEADER */}
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="text-center head-1">Center details </h1>
                  <p className="head-para text-center">{center.center.name}</p>
                </div>
              </div>
              <hr />
            </div>
            {/* END PAGE-HEADER */}

            <div className="container" id="center-details-slider">
              {' '}
              <CenterDetailsComponent
                center={center}
                onChange={this.onchange}
                onDelete={this.onDelete}
              />
              <hr />
            </div>
            {/* <!-- END OF EVENT CENTER DETAILS --> */}

            <div className="container" id="event-holding-header">
              <div className="row">
                <div className=" col-sm offset-md-3 col-lg-12">
                  <h4 className="text-center" id="head-holding">
                    Events At This Center
                  </h4>
                </div>
              </div>
              <hr />
            </div>

            <CenterDetailsBodyComponent center={center} />
            <div className="col-sm-12 col-md-6 col-lg-4 paginator ">
              {
                <Pagination
                  className="pagination"
                  onChange={this.onChange}
                  showTitle={true}
                  showPrevNextJumpers={true}
                  current={this.state.currentPage}
                  total={center.count}
                  locale={{
                    items_per_page: 'items',
                    prev_page: 'Previous',
                    next_page: 'Next',
                    page: 'page'
                  }}
                />
              }
            </div>
          </div>
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
    center: state.centerDetailsReducer,
    user: state.userReducer,
    token: state.userTokenReducer
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CenterDetails)
);
