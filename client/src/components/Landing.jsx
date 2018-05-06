/*  eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import NavBarOne from './NavBarOne';


/**
 * 
 * 
 * @export
 * @class LandingPage
 * @extends {React.Component}
 */
export default class LandingPage extends React.Component {
	/**
	 * 
	 * 
	 * @returns 
	 * @memberof LandingPage
	 */
	render () {
      return (
          <div id="landing-background">
						<NavBarOne />
						<div className="container" id="landing-page">
							<div className="row">
									<div className="col-sm-6  col-md-12 col-lg-6" id="heading">
									<h1 className="event-header">Events Manager</h1> {/* <!-- Intro Header --> */}
									</div>

							</div>
						</div>
						<hr/>
						<div className="container-fl" id="body-landing">
							<div className="row">
								<div className="col-sm-8 col-md-8 col-lg-12">
									<p id="para-landing">
										For All Event Planners, Party-Goers, And Owambe Finders
									</p>
								</div>
							</div>
						</div>
						<hr/>
						<div className="container landing-acc">{/* <!-- Container Div for signup and signup prompt --> */}
							<div className="row">
								<div className="col-lg-4 offset-md-7">
									
									<p className="landing-auth">Already have an account?</p>
									<p className="lead">
											<Link className="btn btn-clear btn-secondary btn-min-block"
											to='/signin'>sign-in <span><i className="fa fa-sign-in" aria-hidden="true"></i></span></Link>
									</p>

								</div>
								<div className="">
									
									<p className="landing-auth">Have no account? </p>
									<p className="lead">
											<Link className="btn btn-clear btn-primary btn-min-block"  to="/signup">Signup <span><i className="fa fa-user-plus" aria-hidden="true"></i></span></Link>
									</p>
								</div>

							</div>
						</div>{/* <!-- End container div for signup and signin prompt --> */}
          </div>
      )
  }
}


