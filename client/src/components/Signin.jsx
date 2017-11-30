import React from 'react';
import { connect } from 'react-redux';

import { userSignin } from '../actions/actions';

import NavBarOne from './NavBarOne';
import Footer from './footer.jsx'

/**
 * 
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {
	/**
	 * @param {e} e
	 * @return {*} any
	 * @memberof Signin
	 */
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = (e) => {
		e.preventDefault();
		let userData = this.state;
		const { dispatch } = this.props;
		return dispatch(userSignin(userData));
	}
	/**
	 * A render method that renders the 
	 * @returns {component} component
	 * @memberof Signin
	 */
	render() {
		return (
			<div>
				<NavBarOne />
					<div id="form-signin" className="container">
						<form className="form-horizontal" role="form" method="POST" onSubmit={this.onSubmit} action="#">
								<div className="row">
										<div className="col-md-3"></div>
										<div className="col-md-6">
												<h2 className="signup-text">Welcome!</h2>
												<hr />
												<p className="signup-text">Please fill the form below to log into Events Manager</p>
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
												<label htmlFor="name">Password</label>
										</div>
										<div className="col-md-6">
												<div className="form-group">
														<label className="sr-only" htmlFor="password">Password</label>
														<div className="input-group mb-2 mr-sm-2 mb-sm-0">
																<div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
																<input onChange={this.onChange}  type="password" name="password" className="form-control" id="password"
																			placeholder="Password" required /> 
														</div>
												</div>
										</div>
										<div className="col-md-3">
												<div className="form-control-feedback">
														
												</div>
										</div>
								</div>
								<div className="row">
										<div className="col-md-3"></div>
										<div className="col-md-6" style={{paddingTop: '.35rem'}}>
												<div className="form-check mb-2 mr-sm-2 mb-sm-0">
														<label className="form-check-label">
																<input className="form-check-input" name="remember"
																			type="checkbox" />
																<span style={{paddingBottom: '.15rem'}}>Remember me</span>
														</label>
												</div>
										</div>
								</div>
								<div className="row" style={{paddingTop: '1rem'}}>
										<div className="col-md-3"> </div>
										<div className="col-md-6">
												<button type="submit" className="btn btn-success">  Sign-in <span> <i className="fa fa-sign-in"></i></span></button>
												<a className="btn btn-link" href="#">Forgot Your Password?</a>
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

export default connect(
	null,
	mapDispatchToProps
)(Signin)