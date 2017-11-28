/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Redirect } from 'react-router-dom';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit(e) {
		
		// this.setState({ errors: {} })
		e.preventDefault();
		this.props.userSignupRequest(this.state).then(
			() => {
				window.location.href = '/getEvents';
			},
			(error) => this.setState({ errors: error.response.data })
		);
	}
  render() {
		const { errors } = this.state;

    return (
        <form id="form-signup" className="form-horizontal" role="form" method="POST" onSubmit={this.onSubmit} action="#">
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
                        <input onChange={this.onChange} value={this.state.name} type="text" name="name" className="form-control" id="name"
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
                        <input onChange={this.onChange} value={this.state.email} type="text" name="email" className="form-control" id="email"
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
                        <input onChange={this.onChange} value={this.state.password} type="password" name="password" className="form-control" id="password"
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
                        <input onChange={this.onChange} value={this.state.confirmPassword} type="password" name="confirmPassword" className="form-control"
                               id="password-confirm" placeholder="Password" />
                    </div>
                </div>
               
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
            { errors.message &&    <span className="text-danger align-middle">
                            {errors.message}
                        </span>
                        }</div><br/>
            <div className="col-md-6">
                <button type="submit" className="btn btn-success"> Sign-up  <span><i className="fa fa-user-plus"></i></span></button>
            </div>
        </div>
    </form>
      );
  }
}

Signup.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
}

export default Signup;