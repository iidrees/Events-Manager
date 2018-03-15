import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { getEvents  } from '../actions/eventAction';

/**
 * 
 * 
 * @className GetEvents
 * @extends {React.Component}
 */
class GetEvents extends React.Component {
/**
 * A method that lets a user get their events
 * @memberof GetEvents
 * @returns {any} {}
 */
componentWillMount() {
    const { dispatch } = this.props;
    return dispatch(getEvents());
  }

  /**
 * 
 * 
 * @returns {*} method
 * @memberof GetEvents
 */
render() {  
  const { events, status } = this.props;
  
  return (
    <div>
      <NavBarMain />
      <div className="container" id="myevent">
        <div className="row">          
          <div className="container" >{/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
            <div className="row">
              <div className="col-sm-12">
                  <h1 className=" head1 text-center">My Events</h1>
                  <p id="p-head" className="head1 text-center">
                    Check your pending events below.
                  </p>
                  <hr />
                  {(events.status === 'Success' ) && <div className="alert alert-success" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
                        <strong>{events.message}.</strong></div>}
                        {(events.status === 'Unsuccessful' ) && <div className="alert alert-danger" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
												<strong>{events.message}.</strong></div>}
              </div>
            </div>
          </div>{/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
          <div className="container" >			
              <div className="row">            
            {events.data.map((event) => {
              return (
              <div className="col-sm-4" key={event.id}>
              <div className="card-deck cont-body" id="card-body" >
                <div className="card" style={{height: "10rem"}}>
                <Link to={`/eventdetails/${event.id}`} ><img className="card-img-top" src="https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg" alt="Card image cap" /></Link>
                  <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                    <h5 className="card-title even-font">
                      <span className="">Event: </span>
                      {event.title}
                    </h5>
                    <p className=" even-font">
                        <span>Description: </span>
                      {event.description}</p>
                    <p className="card-title even-font">
                        <span>DATE: </span>
                      {event.date}</p>
                    <p className=" even-font">
                        <span>LOCATION: </span>
                      {event.center}</p>
                    <p className="card-text">
                        <span>tags:  </span>
                      <small className=" event-tag">#{event.type} event</small></p>
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
      <div id="card-body1">
      </div>
      <Footer />
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
    events: state.eventReducer,
    status: state.userReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GetEvents);