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
  </div>
);

export default GetCentersHeaderComponent;
