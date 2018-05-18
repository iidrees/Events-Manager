import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeaderComponent = props => (
  <div className="col-sm-12">
    <h1 className=" head1 text-center">My Events</h1>
    <p id="p-head" className="head1 text-center">
      Check event below.
    </p>
    <hr />
    {props.event.status === 'Success' && (
      <div className="alert alert-success" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.event.message}.</strong>
      </div>
    )}
    {props.event.status === 'Unsuccessful' && (
      <div className="alert alert-danger" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.event.message}.</strong>
      </div>
    )}
  </div>
);

export default DetailsHeaderComponent;
