import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { deleteCenter } from '../actions/deleteCenterAction';
import {centerDetails } from '../actions/centerDetailsAction';

/**
 * 
 * 
 * @class CenterDetails
 * @extends {React.Component}
 */
class CenterDetails extends React.Component {
/**
 * 
 * 
 * @returns {JSON} JSON
 * @memberof CenterDetails
 */
componentWillMount() {
    const { dispatch } = this.props;
    console.log('This is details dispatch >>>>')
    return dispatch(centerDetails(this.props.match.params.id));
  }
/**
 * 
 * @returns {null} null
 * @param {event} event -
 * @memberof CenterDetails
 */
onDelete = (event) => {
    event.preventDefault();
    let { center } = this.props;
    const { dispatch } = this.props;
    return dispatch(deleteCenter(center.id));
  }
/**
 * 
 * 
 * @returns {JSX} JSX
 * @memberof CenterDetails
 */
render () {

    const { center, user } = this.props;

    return (
      <div>
        <div>
          {
            (!user.authenticated) &&
            <Redirect to='/signin' push />
          }
        </div>
      <div className="container">
        <div className="row">
          <div className="container" id="center-details-header">{/* START PAGE HEADER */}
            <div className="row">
              <div className="col-sm-12">              
                  <h1 className="text-center head-1">Event center details </h1>
                    <p className="head-para text-center">
                    The {center.name}
                    </p>
              </div>
            </div>
            <hr/>
          </div>{/* END PAGE-HEADER */}

          <div className="container" id="center-details-slider"> {/* <!-- START OF EVENT CENTER DETAILS --> */}
            <div className="row">
              <div className="col-md-6">{/* <!--  START OF SLIDER COLUMN --> */}
                  <div id="carousel-landing" className="carousel slide" data-ride="carousel">{/* <!-- START TAG FOR CAROUSEL SLIDER   --> */}
                    <ol className="carousel-indicators">
                      <li data-target="#carousel-landing" data-slide-to="0" className="active"></li>
                      <li data-target="#carousel-landing" data-slide-to="1"></li>
                      <li data-target="#carousel-landing" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item active">
                        <img id="img-landing1" className="d-block img-fluid" src="https://static.pexels.com/photos/3865/lights-night-firework-new-year-s-eve.jpg" style={{width: '100%', height: '65%'}} alt="First slide"/>
                      </div>
                      <div className="carousel-item">
                        <img id="img-landing2" className="d-block img-fluid" src="https://static.pexels.com/photos/274192/pexels-photo-274192.jpeg"  style={{width: '100%', height: '65%'}} alt="Second slide"/>
                      </div>
                      <div className="carousel-item">
                        <img id="img-landing3" className="d-block img-fluid" src="https://static.pexels.com/photos/169190/pexels-photo-169190.jpeg"  style={{width: '100%', height: '65%'}} alt="Third slide"/>
                      </div>
                      <div className="carousel-item">
                          <img id="img-landing4" className="d-block img-fluid" src="https://static.pexels.com/photos/169211/pexels-photo-169211.jpeg"  style={{width: '100%', height: '65%'}} alt="Third slide"/>
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#carousel-landing" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel-landing" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                </div>{/* <!--  END Carousel slider Tag --> */}
              </div>{/* <!-- END OF SLIDER COLUMN --> */}
              
              <div className="col-md-6">
                <p className="center-details-para">
                  <span className="center-details-span">Center:</span>
                  The {center.name}
                </p>
                <p className="center-details-para">
                  <span className="center-details-span">Description:</span> <br/>
                  {center.description}
                </p>
                <p className="center-details-para">
                  <span className="center-details-span">Location:</span>
                  {center.location}
                </p>
                <p className="center-details-para">
                  <span className="center-details-span">Capacity:</span>
                  {center.capacity}
                </p>
                <p className="center-details-para">
                  <span className="center-details-span" >Owner:</span>
                  {center.owner}
                </p>
                <p className="center-details-para">
                </p>
                <Link className="btn btn-primary" to={`/editcenter/${center.id}`} role="button">Edit Center Details</Link>
                {/* <button className="btn btn-danger" onClick={this.onDelete}  role="button">DELETE CENTER</button> */}
                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteCenter">
                    DELETE
                  </button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="deleteCenter" tabIndex="-1" role="dialog" aria-labelledby="deleteCenterLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteCenterLabel">ARE YOU SURE YOU WANT TO DELETE THIS CENTER?</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                        The {center.name}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
                          <button className="btn btn-warning" onClick={this.onDelete} type="button">Delete Center</button>
                          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <hr/>
          </div>{/* <!-- END OF EVENT CENTER DETAILS --> */}

          <div className="container" id="event-holding-header">
            <div className="row">
              <div className="col-sm-12">              
                <h4 className="text-center" id="head-holding">
                  Events At This Event Center
                </h4>
              </div>
            </div>
            <hr/>
          </div>

          <div className="container" id="event-holding">
            <div className="row">
           {/* {center.events.map((event) => {
              return (

              <div className="col-sm-4" key={event.id}>
              <div className="card-deck cont-body" id="card-body">
                <div className="card" id="card1" style={{height: "10rem"}}>
                  <img className="card-img-top" src="https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg" alt="Card image cap"/>
                  <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                    <h5 className="card-title even-font">
                      <span >Event:</span>
                      {event.title}
                    </h5>
                    <p className="card-title date-font">
                        <span>DATE:</span>
                      {event.date}</p>
                    <p className="card-text">
                        <span>tags:</span>
                      <small className="text-muted">{event.type}</small></p>
                  </div>              
                </div>
              </div>
            </div>
              )
            })}  */}

            </div>
          </div>
          
        </div>
      </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => dispatch(action)
  }
};
const mapStateToProps = (state) => {
  return {
    center: state.centerDetailsReducer,
    user: state.userReducer
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);