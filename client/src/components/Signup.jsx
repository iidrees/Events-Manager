/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';

import  { userSignup }  from '../actions/actions'
import NavBarOne from './NavBarOne';
import Footer from './footer.jsx'
class Signup extends React.Component {
	
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = (e) => {
		e.preventDefault();
		console.log("HERE");
		let userData = this.state;
		const { dispatch } = this.props;
		return dispatch(userSignup(userData))
	}

  render() {
		//const { errors } = this.state;

    return (
        <div>
					<NavBarOne />
					<div className='container' id="form-signup">
						<form id="form-signup" className="form-horizontal" role="form" method="POST" onSubmit={this.onSubmit} >
						<div className="row">
								<div className="col-md-3"></div>
								<div className="col-md-6">
										<h2 className="signup-text">Let's get started</h2>
										<hr />
										<p className="signup-text">enter your name, email and password to Sign-up </p>
								</div>
						</div>
						<div className="row">
								<div className="col-md-3 field-label-responsive">
										<label htmlFor="name">Name</label>
								</div>
								<div className="col-md-6">
										<div className="form-group">
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
														<div className="input-group-addon"  ><i className="fa fa-user"></i></div>
														<input onChange={this.onChange}  type="text" name="name" className="form-control" id="name"
																	placeholder="Idrees Ibraheem" autoFocus />
												</div>
										</div>
								</div>
								
								<div className="col-md-3">
										<div className="form-control-feedback">
										
										</div>
								</div>
								
						</div>
						<div className="row">
								<div className="col-md-3 field-label-responsive">
										<label htmlFor="email">E-Mail Address</label>
								</div>
								<div className="col-md-6">
										<div className="form-group">
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
														<div className="input-group-addon" ><i className="fa fa-at"></i></div>
														<input onChange={this.onChange}  type="text" name="email" className="form-control" id="email"
																	placeholder="youremail@host.com"  autoFocus />
												</div>
										</div>
								</div>
								<div className="col-md-3">
										<div className="form-control-feedback">
														<span className="text-danger align-middle">
																
														</span>
										</div>
								</div>
						</div>
						<div className="row">
								<div className="col-md-3 field-label-responsive">
										<label htmlFor="password">Password</label>
								</div>
								<div className="col-md-6">
										<div className="form-group has-danger">
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
														<div className="input-group-addon" ><i className="fa fa-key"></i></div>
														<input onChange={this.onChange} type="password" name="password" className="form-control" id="password"
																	placeholder="Password"  />
												</div>
										</div>
								</div>
						</div>
						<div className="row">
								<div className="col-md-3 field-label-responsive">
										<label htmlFor="password">Confirm Password</label>
								</div>
								<div className="col-md-6">
										<div className="form-group">
												<div className="input-group mb-2 mr-sm-2 mb-sm-0">
														<div className="input-group-addon" >
																<i className="fa fa-repeat"></i>
														</div>
														<input onChange={this.onChange}  type="password" name="confirmPassword" className="form-control"
																	id="password-confirm" placeholder="Password" />
												</div>
										</div>
									
								</div>
						</div>
						<div className="row">
								<div className="col-md-3">
								</div><br/>
								<div className="col-md-6">
										<button type="submit" className="btn btn-success"> Sign-up  <span><i className="fa fa-user-plus"></i></span></button>
								</div>
						</div>
				</form>
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
export default connect(null, mapDispatchToProps)(Signup);