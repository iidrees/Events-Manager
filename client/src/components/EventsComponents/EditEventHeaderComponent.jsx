import React from 'react';
import { Link } from 'react-router-dom';

const EditEventHeaderComponent = props => (
  <div className="row">
    <div className="container" id="add-event-header">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="text-center head-1">Edit your event </h1>
          <p className="head-para text-center" />
        </div>
      </div>
    </div>
    {props.editEvents.status === 'Success' && (
      <div className="alert alert-success" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.editEvents.message}.</strong>
      </div>
    )}
    {props.editEvents.status === 'Unsuccessful' && (
      <div className="alert alert-danger" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.editEvents.message}</strong>
        <span> </span>
        <strong>{props.editEvents.error}.</strong>
      </div>
    )}
  </div>
);

export default EditEventHeaderComponent;
