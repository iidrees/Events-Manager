import React from 'react';
import { Link } from 'react-router-dom';

const GetCentersHeaderComponent = props => (
  <div className="row">
    <div className="container" id="event-page">
      {/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
      <div className="row">
        <div className="col-sm-12">
          <h1 className=" head1 text-center" id="centerid" />
          <p id="p-head" className="head1 text-center">
            Are you looking for a location to host your events? <br />
            Checkout these popular event centers
          </p>
          <hr />
        </div>
      </div>
    </div>
    {/* <!-- END BODY-HEADER WITH SEARCH FORM --> */}
    {props.centers.status === 'Success' && (
      <div className="alert alert-success" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.centers.message}.</strong>
      </div>
    )}
    {props.centers.status === 'Unsuccessful' && (
      <div className="alert alert-danger" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{props.centers.message}</strong>
        <span> </span>
        <strong>{props.centers.error}.</strong>
      </div>
    )}
  </div>
);

export default GetCentersHeaderComponent;
