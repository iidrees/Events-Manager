import React from 'react';
import { Link } from 'react-router-dom';

/*
 The Navigation Bar component
 */
export default () => {
  return (
    <header >
      <nav id="nav-bar-nav" className="navbar navbar-expand-lg navbar-toggleable-md fixed-top navbar-dark bg-dark " >        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-signup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a id="nav-logo-nav" className="navbar-brand" href="/">Events Manager!</a>
        <div className="collapse navbar-collapse left" id="navbar-signup">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item nav-link">
            <Link to='/signup' className=" nav-link">signup</Link>
            </li>
            <li className="nav-item nav-link">
            <Link to='/signin' className=" nav-link">signin</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}