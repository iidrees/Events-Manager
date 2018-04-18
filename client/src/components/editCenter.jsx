/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import NavBarMain from './NavBarMain.jsx';
import Footer from './footer.jsx';
import { editCenter } from '../actions/editCenterAction';
import { centerDetails } from '../actions/centerDetailsAction';



class EditCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerData: {
        ...this.props.center
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   return dispatch(centerDetails(this.props.match.params.id));
  // } 

  componentDidUpdate() {
    // if (Object.keys(this.state.centerData).length == 0) {
    //   this.setState({
    //     centerData: {
    //       ...this.props.center.data,
    //     }
    //   });
    // }
  }

  onChange = (event) => {
    
    this.setState({ 
      centerData: {
      ...this.state.centerData,
      [event.target.name]: event.target.value
      }
     })
  }

  onSubmit = (event) => {
    event.preventDefault();
    let { centerData } = this.state;

    console.log('the component POST DATA >>>>',centerData)
    const { dispatch } = this.props;
    return dispatch(editCenter(this.props.match.params.id, centerData));
  }

 

  render () {
    
    const { user, center , editCenter} = this.props;
    console.log('this is the edit center component>>>>>', center)
    console.log('this is the edit center component>>>>>', user)
    console.log('this is the edit center component>>>>>', editCenter)

    return (
      <div>
        <div>
          {
            (!user.authenticated) &&
            <Redirect to='/signin' push />
          }
          < NavBarMain />
        </div>
        <div className="container">
          <div className="row">
            <div className="container" id="add-center-header">
              <div className="row">
                <div className="col-sm-12">              
                  <h1 className="text-center head-1" id="admin-add-head">Edit Centers Below </h1>
                  <p className="head-para text-center">
                  
                  </p>
                  <hr />
                </div>
              </div>
            </div>

            {(editCenter.status === 'Success' ) && <div className="alert alert-success" role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>{editCenter.message}.</strong></div>}
              {(editCenter.status === 'Unsuccessful' ) && <div className="alert alert-danger" role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>{editCenter.message}</strong><span> </span>
              <strong>{editCenter.error}.</strong></div>}
      
        
            <div className="container">{/* <!-- Start container for Add Form --> */}
              <div className="row">
                <div className="col-md-6">
                  <form method="POST" className="form form-center"  onSubmit={this.onSubmit} role="form" id="admin-form"  action="#">{/* <!-- ADD FORM --> */}
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Name of Center:</label>
                      <input className="form-control" onChange={this.onChange} name="name" type="text"  id="example-text-input" value={this.state.centerData.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Location:</label>
                      <input className="form-control" type="text" id="example-text-input" name="location" onChange={this.onChange}  value={this.state.centerData.location}/>
                    </div>                
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Address:</label>
                      <input className="form-control" type="text" id="example-text-input" name="address" onChange={this.onChange} value={this.state.centerData.address}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Capacity:</label>
                      <input className="form-control" type="text" id="example-text-input" name="capacity" onChange={this.onChange} value={this.state.centerData.capacity}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Owner:</label>
                      <input className="form-control" type="text" id="example-text-input" name="owner" onChange={this.onChange} value={this.state.centerData.owner}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="event-details" className=" home-para"> Description:</label>
                      <textarea className="form-control" id="eventTextarea" rows="8" name="description" onChange={this.onChange} value={this.state.centerData.description}></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="add-center" className=" home-para">Upload an Image of event center below:</label>
                      <input type="file" className="form-control-file" onChange={this.onChange} id="exampleInputFile" aria-describedby="fileHelp" />
                    </div>  
                    <button type="submit" className="btn btn-primary btn-sm" id="save-event">Update Center<span><i className="fa fa-paper-plane" aria-hidden="true"></i></span></button>
                    
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
    center: state.centerDetailsReducer,
    editCenter: state.editCenterReducer,
    user: state.userReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCenter);