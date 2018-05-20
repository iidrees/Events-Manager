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
  </div>
);

export default AddCenterHeaderComponent;
