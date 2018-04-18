import React from 'react';
import { Link } from 'react-router-dom';

/*
 The Navigation Bar component
 */
export default () => {
  return (
<header >{/* <!-- Start HEADER for NAVBAR --> */}
			<nav id="nav-bar" className="navbar navbar-expand-lg navbar-toggleable-md fixed-top navbar-dark bg-dark " >        
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-myevents" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<a id="nav-logo" className="navbar-brand" href="/">Events Manager!</a>
				<div className="collapse navbar-collapse left" id="navbar-myevents">
					<ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              <Link className="nav-link" to='/getcenters'>See Centers</Link>
            </li>
            <li>
              <Link className="nav-link" to='/addevents'>Add Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/getevents'>My Events</Link>
            </li> 
            <li className="nav-item">
                <Link className="nav-link" to='/addcenter'>Add Center</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" to='/help'>Help</Link>
            </li> */}
					</ul>
				</div>
			</nav>
    </header>/* <!-- END HEADER FOR NAVBAR --> */
     );
    }