import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { history } from '../../routes';
import checkUser from './checkUser';

/**
 *
 *
 * @export
 * @param {any} Compo -
 * @returns {void}
 */
export default function authRoute(Compo) {
  /**
   *
   *
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {
    /**
     *@returns {void}
     *
     * @memberof Authenticate
     */
    componentWillMount() {
      if (checkUser() === false) {
        history.push('/signin');
      }
    }

    /**
     *
     * @type {void}
     * @returns {void}
     * @memberof Authenticate
     */
    render() {
      return <Compo {...this.props} />;
    }
  }

  return withRouter(connect(null, null)(Authenticate));
}
