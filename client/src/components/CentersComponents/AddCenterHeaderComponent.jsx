import React from 'react';
import { Link } from 'react-router-dom';

const AddCenterHeaderComponent = props => (
  <div>
    <div className="container" id="add-center-header">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="text-center head-1" id="admin-add-head">
            Add New Event Centers Below{' '}
          </h1>
          <p className="head-para text-center" />
          <hr />
        </div>
      </div>
    </div>

    {props.createCenter.status === 'Success' && (
      <div className="alert alert-success" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.createCenter.message}.</strong>
      </div>
    )}
    {props.createCenter.status === 'Unsuccessful' && (
      <div className="alert alert-danger" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.createCenter.message}</strong>
        <span> </span>
        <strong>{props.createCenter.error}.</strong>
      </div>
    )}
  </div>
);

export default AddCenterHeaderComponent;
