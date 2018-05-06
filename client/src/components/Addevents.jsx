import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { addEvent,  } from '../actions/addEventActions';
import  getCenters  from '../actions/getCentersAction';
import  { imageUpload }  from '../actions/addCentersAction';


/**
 * @param {e} e {events}
 * @class Addevents
 * @extends { React.Component }
 */
class Addevents extends React.Component {



  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
		e.preventDefault();
    let eventData = this.state;
   
    const { dispatch } = this.props;
    if (
      eventData.imgFile === null || 
      eventData.imgFile === undefined || 
      !eventData.imgFile  
    ) {
      console.log('the fisrt submit >>>>')
      return dispatch(addEvent(eventData, eventData.center));
    }
    console.log('the second submit>>>>>>>>>')
      return dispatch(imageUpload(eventData, eventData.center));
  }

  /**
 * @param {e} e {event}
 * @returns {any} any
 * @memberof AddEvents
 */
onImageChange = (e) => {
  e.preventDefault();

  let reader = new FileReader();
  let imgFile = e.target.files[0];

  if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png') {
    reader.onloadend = () => {
      this.setState({
        imgFile: imgFile,
        imgUrl: reader.result
      });
    }
    reader.readAsDataURL(imgFile);
  } else {
    alert('Please upload an image with the .jpeg or .png file format')
  }

}

  /**
   * 
   * 
   * @returns {JSON} An array of centers
   * @memberof Addevents
   */
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getCenters());
  }

  /**
   * 
   * 
   * @returns {any} - 
   * @memberof Addevents
   */
  render() {
    
    const { user, centers , event} = this.props;
  return (
    <div>
      <div>
        {
          // (!user.authenticated) &&
          // <Redirect to='/signin' push />
        }
      </div>
    <NavBarMain />
    <div className="container" id="add-events">
    <div className="row">
      <div className="container col-sm-12 col-md-12 col-lg-12" id="add-event-header">
        <div className="row">
          <div className="col-md-12">              
            <h1 className="text-center head-1">Add your events </h1>
            <p className="head-para text-center">
              Are you in need of a location to host your event? 
              If yes, then why not host your events using one of 
              our numerous event centers by creating an event below?
            </p>
          </div>
        </div>
      </div>
    
      {(event.status === 'Success' ) && 
      <div className="alert alert-success" role="alert">
        <button 
          type="button" 
          className="close" 
          data-dismiss="alert" 
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{event.message}.</strong></div>}
        {(event.status === 'Unsuccessful' ) && 
        <div className="alert alert-danger" role="alert">
        <button 
        type="button" 
        className="close" 
        data-dismiss="alert" 
        aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{event.message}</strong><span> </span>
        <strong>{event.error}.</strong></div>} 
      
      <div className="container">{/* <!-- Start container for Add Form --> */}
        <div className="row">
          <div className="col-sm-12">
            <form method="POST" className="form-horizontal" onSubmit={this.onSubmit} role="form">{/* <!-- ADD FORM --> */}
              <div className="form-group">
                <label htmlFor="add-event" className=" home-para">Name of Event:</label>
                <input className="form-control" onChange={this.onChange}  name="title" id="form-event1" type="text" placeholder=""  />
              </div>
              <div className="form-group">
                <label htmlFor="add-event" className=" home-para">Date of event:</label>
                <input className="form-control" onChange={this.onChange}  name="date" type="text" id="form-event2"placeholder="YY/MM/DD"  />
              </div>              
              <div className="form-group">
                <label htmlFor="add-event" className=" home-para">Time:</label>
                <input className="form-control" onChange={this.onChange}  name="time" type="text" id="form-event7"placeholder="hh:mm AM/PM"  />
              </div>
              <div className="form-group">
                <label htmlFor="event-centers" className=" home-para">Center:</label>
                <select className="form-control" id="event-center1" onChange={this.onChange}  name="center">
                  <option className="home-para">Choose an event center</option>
                  {(centers.centers.map((center) => {
                    
                    return (<option key={center.id} value={center.id} className="home-para">{center.name}</option>)
                  }))}
                  
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="event-details"  className=" home-para">Events description:</label>
                <textarea className="form-control" onChange={this.onChange} id="form-event4" rows="8" name="description" placeholder="brief details about the event"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="add-event" className=" home-para">Upload an Image of your event below:</label>
                <input type="file" className="form-control-file" onChange={this.onImageChange} id="input-file" name="images"  aria-describedby="fileHelp" /> 
              </div>  
          
              <button type="submit" className="btn btn-primary btn-sm" id="save-event">Save and create event  <span><i className="fa fa-paper-plane" aria-hidden="true"></i></span></button>
            </form>          
          </div>{/* <!-- End Container ADD EVENTS FORM --> */}
        </div>
      </div>
  </div>{/* <!-- End container for the Head section --> */}
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
    event: state.addEventReducer,
    user: state.userReducer,
    centers: state.centerReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Addevents);