import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { detailEvent  } from '../actions/eventAction';
import { deleteEvent  } from '../actions/deleteEventAction';

/**
 * 
 * 
 * @className GetEvents
 * @extends {React.Component}
 */
class DetailEvent extends React.Component {
/**
 * A method that lets a user get their events
 * @memberof DetailEvent
 * @returns {any} dispatched actions
 */
componentWillMount() {
    const { dispatch } = this.props;
    
    return dispatch(detailEvent(this.props.match.params.id));
    
  }

/**
 * @param {e} e is the event
 * @returns {action} returns a dispatched action
 * @memberof DetailEvent
 */
onDelete = (e) => {
    e.preventDefault();
    let { event } = this.props;
    const { dispatch } = this.props;
    return dispatch(deleteEvent(event.data.id));
  }

  /**
 * 
 * 
 * @returns {*} JSX
 * @memberof DetailEvent
 */
render() {  
  const { event, user } = this.props;

  
  
  return (
    <div>
      <div>
          {
            (!user.authenticated) &&
            <Redirect to='/signin' push />
          }
        </div>
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
                  {(event.status === 'Success' ) && <div className="alert alert-success" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
                        <strong>{event.message}.</strong></div>}
                        {(event.status === 'Unsuccessful' ) && <div className="alert alert-danger" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
												<strong>{event.message}.</strong></div>} 
              </div>
            </div>
          </div>{/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
          <div className="container" id="details-ev">
            <div className="row">
              <div className="col-md-6">
                <img id="img-details" src="https://static.pexels.com/photos/399610/pexels-photo-399610.jpeg" alt="felabration" />
              </div>
              <div className="col-md-6">
                <p className="font-details">
                  <span >Event:</span> {event.title}
                </p>
                <p className="font-details">
                    <span>DATE:</span> {event.time}
                </p>
                <p className="font-details">
                    <span>Center:</span> {event.center}
                </p>
                <p className="font-details">
                    <span>Event Organizers:</span> Fela &amp; sons
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="font-details text-center">
                    <span className="font-span">Event Description</span><br />
                    {event.description}
                </p>
                <div className="detail-button">

                
                  {/* <!-- Button trigger modal --> */}
                  <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteEvent">
                    DELETE
                  </button>

                  {/* <!-- Modal --> */}
                  <div className="modal fade" id="deleteEvent" tabIndex="-1" role="dialog" aria-labelledby="deleteEventLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteEventLabel">Modal title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          ARE YOU SURE YOU WANT TO DELETE THIS EVENT?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
                          <button className="btn btn-warning" onClick={this.onDelete} type="button">Delete Event</button>
                          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <button className="btn btn-primary" type="submit">Delete Event</button> */}
                  {/* <button className="btn btn-danger" onClick={this.onDelete} type="button">Delete Event</button> */}
                  <span>

                  </span>
                  
                  <Link  to={`/editevent/${event.id}`} >
                  <button className="btn btn-primary" type="button">
                  Edit Event
                  </button>
                  </Link>
                  
                </div>
                </div>
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
    event: state.detailsEventReducer,
    user: state.userReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);