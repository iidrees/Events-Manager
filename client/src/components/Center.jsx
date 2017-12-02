import React from 'react';
import { connect } from 'react-redux';

import NavBarOne from './NavBarOne';
import Footer from './footer.jsx'
import  getCenters   from '../actions/getCentersAction'


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
    const { centers } = this.props;
    
    return (
      <div>
        <NavBarOne />
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
          
          <div className="container" id="centerbottom">			
              <div className="row">
              {centers.map((center) => {
                return (
                <div className="col-sm-12" key={center.id}>
                <div className="card-deck cont-body" id="card-center1" >
                  <div className="card" id="card1" style={{height: "10rem"}}>
                    <a href="centerDetails.html"><img className="card-img-top" src="https://static.pexels.com/photos/169193/pexels-photo-169193.jpeg" alt="Card image cap" /></a>
                    <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                      <h5 className="card-title even-font">
                        <span  className="all-centers-font">Center:</span>
                       {center.name}
                      </h5>
                      <p className="card-title date-font">
                          <span className="all-centers-font">STATUS:</span>
                        {center.status}</p>
                      <p className=" location-font">
                          <span  className="all-centers-font">LOCATION:</span>
                        {center.location}</p>
                        
                      <p className=" location-font">
                          <span  className="all-centers-font">Description:</span>
                        {center.description}</p> 

                      <p className=" location-font">
                          <span  className="all-centers-font">ADDRESS:</span>
                        {center.address}</p>

                      <p className=" location-font">
                          <span  className="all-centers-font">OWNER:</span>
                        {center.owner}</p>

                      <p className=" location-font">
                          <span  className="all-centers-font">CAPACITY:</span>
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
    centers: state.centerReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Center);

