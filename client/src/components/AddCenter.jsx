
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { addCenter, imageUpload } from '../actions/addCentersAction';
import { centerDetails } from '../actions/centerDetailsAction';


/**
 * 
 * @param {event} e {e}
 * @class AddCenter
 * @extends {React.Component}
 */
class AddCenter extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let centerData = this.state;
    const { dispatch } = this.props;
    if (!centerData.imgFile) {
      return dispatch(addCenter(centerData))
    }
    return dispatch(imageUpload(centerData));
  }

/**
 * @param {e} e {event}
 * @returns {any} any
 * @memberof AddCenter
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
 * @returns {String} return the HTML markup to be rendered 
 * @memberof AddCenter
 */
render () {

    const { createCenter, user } =  this.props;
    console.log('add center component >>>>', createCenter, ' and User reducer', user)
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
      
           {(createCenter.status === 'Success' ) && <div className="alert alert-success" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
                        <strong>{createCenter.message}.</strong></div>}
                        {(createCenter.status === 'Unsuccessful' ) && <div className="alert alert-danger" role="alert">
												<button type="button" className="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
												<strong>{createCenter.message}</strong><span> </span>
												<strong>{createCenter.error}.</strong></div>}
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
                      <input className="form-control" type="text" placeholder=" Enter Location" id="example-text-input" name="location" onChange={this.onChange}  />
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
                      <input className="form-control" type="text" placeholder="Enter Owner" id="example-text-input" name="owner" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="event-details" className=" home-para"> Description:</label>
                      <textarea className="form-control" id="eventTextarea" rows="8" placeholder="brief details about the event" name="description" onChange={this.onChange} ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Upload an Image of event center below:</label>
                      <input type="file" className="form-control-file" onChange={this.onImageChange} id="input-file" name="images" aria-describedby="fileHelp" />
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
    createCenter: state.addCenterReducer,
    user: state.userReducer
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCenter);