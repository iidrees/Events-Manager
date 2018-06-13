import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

/**
 *
 * @class NotFound
 * @extends {React.Component}
 */
class NotFound extends React.Component {
  /**
   *
   * @returns {JSX} -
   * @memberof NotFound
   */
  render() {
    return (
      <h1
        style={{
          paddingTop: '60px',
          fontSize: '20px'
        }}
      >
        <div
          className="alert alert-success"
          role="alert"
          style={{ textAlign: 'center' }}
        >
          <strong style={{ textAlign: 'center' }}>404 - PAGE NOT FOUND</strong>
        </div>
      </h1>
    );
  }
}

export default NotFound;
