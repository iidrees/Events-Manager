/*  eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { history } from '../routes';
import Footer from './footer.jsx';
/**
 *
 *
 * @export
 * @class LandingPage
 * @extends {React.Component}
 */
export default class LandingPage extends React.Component {
  componentDidMount() {
    let token;
    let noToken;
    try {
      token = localStorage.getItem('x-access-token');
      let decodedToken = jwt.decode(token);
      noToken = false;

      if (decodedToken.admin === true && decodedToken.role === 'Admin') {
        history.push('/getCenters');
      } else {
        history.push('/myevents');
      }
    } catch (error) {
      return (noToken = null);
    }
  }
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
