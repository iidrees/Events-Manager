/*  eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import Footer from './footer.jsx';
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
  render() {
    return (
      <div id="landing-background">
        <div className="container" id="landing-page">
          <div className="row">
            <div className="col-sm-6  col-md-12 col-lg-6" id="heading">
              <h1 className="event-header">Events Manager</h1>{' '}
              {/* <!-- Intro Header --> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="container" id="body-landing">
          <div className="row">
            <div className="col-sm-8 col-md-8 col-lg-12">
              <p id="para-landing">
                For All Event Planners, Party-Goers, And Owambe Finders
              </p>
            </div>
          </div>
        </div>
        <hr />

       
      </div>
    );
  }
}
