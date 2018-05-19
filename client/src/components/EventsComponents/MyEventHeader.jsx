import React from 'react';
import { Link } from 'react-router-dom';

const MyEventHeader = props => (
  <div className="container">
    {/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
    <div className="row">
      <div className="col-sm-12">
        <h1 className=" head1 text-center">My Events</h1>
        <p id="p-head" className="head1 text-center">
          Check your pending events below.
        </p>
        <hr />
      </div>
    </div>
    {/* <!-- END BODY-HEADER --> */}
  </div>
);

export default MyEventHeader;
