/*  eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
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
          <div>
        <div id="carousel-landing" className="carousel slide" data-ride="carousel">{/* <!-- START TAG FOR CAROUSEL SLIDER   --> */}
				<ol className="carousel-indicators">
					<li data-target="#carousel-landing" data-slide-to="0" className="active"></li>
					<li data-target="#carousel-landing" data-slide-to="1"></li>
					<li data-target="#carousel-landing" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner" role="listbox">
					<div className="carousel-item active">
						<img id="img-landing1" className="d-block img-fluid" src="https://static.pexels.com/photos/114796/pexels-photo-114796.jpeg" style={{width: "100%", height: "70%"}} alt="First slide" />
					</div>
					<div className="carousel-item">
						<img id="img-landing2" className="d-block img-fluid" src="https://static.pexels.com/photos/116024/pexels-photo-116024.jpeg" style={{width:"100%", height:"100%"}} alt="Second slide" />
					</div>
					<div className="carousel-item">
						<img id="img-landing3" className="d-block img-fluid" src="https://static.pexels.com/photos/122250/pexels-photo-122250.jpeg" style={{width: "100%", height: "100%"}} alt="Third slide" />
					</div>
					<div className="carousel-item">
							<img id="img-landing4" className="d-block img-fluid" src="https://static.pexels.com/photos/134469/pexels-photo-134469.jpeg" style={{ width:"100%", height: "100%"}} alt="Third slide" />
					</div>
				</div>
				<a className="carousel-control-prev" href="#carousel-landing" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carousel-landing" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
		</div>{/* <!--  END Carousel slider Tag --> */}
		<div className="jumbotron jumbotron-billboard main-text hidden-xs">
				<div className="col-md-12 text-center">
					<h1 className="event-header">Events Manager</h1> {/* <!-- Intro Header --> */}
					<p id="para-landing">
						This is an Events Manager Application that allows Event Planners, Party-Goers <br /> 
						and just about anyone who is either looking to organise an event, host one or attend <br />
						one to know more about the event, the location of the event, details about the event. <br />
						To see events in your location, please click the 'see events' tab at the navigation bar. <br />
						However if you will like to do more, Kindly sign-in below if you already have an account <br /> or 
						sign-up below to take advantage of all the awesome services we have to offer.
					</p>
					<div className="container">{/* <!-- Container Div for signup and signup prompt --> */}
							<div className="row">
								<div className="col-sm-6">
									
									<p className="landing-auth">Already have an account with us? <br /> click the button below</p>
									<p className="lead">
											<Link className="btn btn-clear btn-sm btn-min-block"
											to='/signin'>sign-in <span><i className="fa fa-sign-in" aria-hidden="true"></i></span></Link>
									</p>

								</div>
								<div className="col-sm-3">
									
									<p className="landing-auth">Have no account? click the button below </p>
									<p className="lead">
											<Link className="btn btn-clear btn-sm btn-min-block"  to="/signup">Signup <span><i className="fa fa-user-plus" aria-hidden="true"></i></span></Link>
									</p>
								</div>

							</div>
						</div>{/* <!-- End container div for signup and signin prompt --> */}
				</div>
		</div>
          </div>
      )
  }
}





