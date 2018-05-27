import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeaderComponent = props => (
  <div className="col-sm-12">
    <h1 className=" head1 text-center">My Events</h1>
    <p id="p-head" className="phead head1 text-center">
      Check event below.
    </p>
    <hr />
  </div>
);

export default DetailsHeaderComponent;
