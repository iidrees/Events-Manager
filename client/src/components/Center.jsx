import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import NavBarOne from './NavBarOne';
import Footer from './footer.jsx'
import  getCenters   from '../actions/getCentersAction'
import NavBarMain from './NavBarMain.jsx';


/**
 * @class Center
 * @extends {React.Component}
 */
class Center extends React.Component {

/**
 * @returns {*} function
 * @memberof Center
 */
componentWillMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }


  /**
   * @returns {*} any
   * @memberof Center
   */
  render() {
    const { centers, user } = this.props;
    console.log('the centers >>>>', centers)
    return (
      <div>
      <div>
        {
          (!user.authenticated) &&
          <Redirect to='/signin' push />
        }
      </div>
      <NavBarMain />
      <div className="container">
      <div className="row">
          <div className="container" id="event-page">{/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
            <div className="row">
              <div className="col-sm-12">
                <h1 className=" head1 text-center" id="centerid"></h1>
                  <p id="p-head" className="head1 text-center">Are you looking for a location to
                    host your events? <br />
                    Checkout these popular event centers in Lagos</p>
                  <hr />
              </div>
              
            </div>
          </div>{/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
          {(centers.status === 'Success' ) && <div className="alert alert-success" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
                        <strong>{centers.message}.</strong></div>}
                        {(centers.status === 'Unsuccessful' ) && <div className="alert alert-danger" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
												<strong>{centers.message}</strong><span> </span>
												<strong>{centers.error}.</strong></div>}
          
          <div className="container" id="centerbottom">			
              <div className="row">
              {centers.data.map((center) => {
                return (
                <div className="col-sm-4" key={center.id}>
                <div className="card-deck cont-body" id="card-center1" >
                  <div className="card" id="card1" style={{height: "10rem"}}>
                    <Link to={`/centerdetails/${center.id}`}><img className="card-img-top" src={center.imgUrl} alt="Center image" /></Link>
                    <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                      <h5 className="card-title even-font">
                        <span  className="all-centers-font">Center: </span>
                       {center.name}
                      </h5>
                      <p className="card-title date-font">
                          <span className="all-centers-font">STATUS: </span>
                        {center.status}</p>
                      <p className=" location-font">
                          <span  className="all-centers-font">LOCATION: </span>
                        {center.location}</p>
                        
                      <p className=" location-font">
                          <span  className="all-centers-font">Description: </span>
                        {center.description}</p> 

                      <p className=" location-font">
                          <span  className="all-centers-font">ADDRESS: </span>
                        {center.address}</p>

                      <p className=" location-font">
                          <span  className="all-centers-font">OWNER: </span>
                        {center.owner}</p>

                      <p className=" location-font">
                          <span  className="all-centers-font">CAPACITY: </span>
                        {center.capacity}</p>
                    </div>              
                  </div>
                </div>
              </div>
                )
              })}
              </div>			
            </div>
      </div>
    </div>
    </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => dispatch(action)
  }
};
const mapStateToProps = (state) => {
  return {
    centers: state.centerReducer,
    user: state.userReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Center);

