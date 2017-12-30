/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { addCenter } from '../actions/addCentersAction';



class AddCenter extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let centerData = this.state;
    console.log('centerData details from component',  centerData);
    const { dispatch } = this.props;
    return dispatch(addCenter(centerData));
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container" id="add-center-header">
              <div className="row">
                <div className="col-sm-12">              
                  <h1 className="text-center head-1" id="admin-add-head">Add New Event Centers Below </h1>
                  <p className="head-para text-center">
                  
                  </p>
                  <hr />
                </div>
              </div>
            </div>
      
        
            <div className="container">{/* <!-- Start container for Add Form --> */}
              <div className="row">
                <div className="col-md-6">
                  <form method="POST" className="form form-center" onSubmit={this.onSubmit} role="form" id="admin-form"  action="#">{/* <!-- ADD FORM --> */}
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Name of Center:</label>
                      <input className="form-control" onChange={this.onChange} name="name" type="text" placeholder="Enter Name of Center" id="example-text-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Location:</label>
                      <input className="form-control" type="text" placeholder=" Enter Location" id="example-text-input" name="location" onChange={this.onChange} />
                    </div>                
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Address:</label>
                      <input className="form-control" type="text" placeholder="Enter Address" id="example-text-input" name="address" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Capacity:</label>
                      <input className="form-control" type="text" placeholder="Enter Capacity" id="example-text-input" name="capacity" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Owner:</label>
                      <input className="form-control" type="text" placeholder="Enter Owner" id="example-text-input" name="owner" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="event-details" className=" home-para"> Description:</label>
                      <textarea className="form-control" id="eventTextarea" rows="8" placeholder="brief details about the event" name="description" onChange={this.onChange}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Upload an Image of event center below:</label>
                      <input type="file" className="form-control-file" onChange={this.onChange} id="exampleInputFile" aria-describedby="fileHelp" />
                    </div>  
                    <button type="submit" className="btn btn-primary btn-sm" id="save-event">Save and create Event Center<span><i className="fa fa-paper-plane" aria-hidden="true"></i></span></button>
                  </form>          
                </div>{/* <!-- End Container ADD EVENTS FORM --> */}
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
    addCenter: state.addCenterReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCenter);