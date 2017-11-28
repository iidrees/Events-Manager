/* eslint-disable */
import React from 'react';
import {  Link } from 'react-router-dom';

/*
 The Navigation Bar component
 */
export default () => {
  return (
    <header >
      <nav id="nav-bar" className="navbar navbar-expand-lg navbar-toggleable-md fixed-top navbar-dark bg-dark " >        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-signup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a id="nav-logo" className="navbar-brand" href="#">Events Manager!</a>
        <div className="collapse navbar-collapse left" id="navbar-signup">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item nav-link">
            <a className="nav-link" href="events-catalog.html">See Events</a>
            </li>
            <li className="nav-item nav-link active">
              <a className="nav-link" href="#">Sign-up</a>
            </li>
            <li className="nav-item nav-link">
              <a className="nav-link" href="signin.html">Sign-in</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}