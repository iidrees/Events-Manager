import React from 'react';
import { Link } from 'react-router-dom';

const EditCenterComponent = props => (
  <div className="col-md-6">
    <form
      method="POST"
      className="form form-center"
      onSubmit={props.onSubmit}
      role="form"
      id="admin-form"
      action="#"
    >
      {/* <!-- ADD FORM --> */}
      <div className="form-group">
        <label htmlFor="add-center" className=" home-para">
          Name of Center:
        </label>
        <input
          className="form-control"
          onChange={props.onChange}
          name="name"
          type="text"
          id="example-text-input"
          value={props.centerData.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-center" className=" home-para">
          Location:
        </label>
        <input
          className="form-control"
          type="text"
          id="example-text-input"
          name="location"
          onChange={props.onChange}
          value={props.centerData.location}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-center" className=" home-para">
          Capacity:
        </label>
        <input
          className="form-control"
          type="text"
          id="example-text-input"
          name="capacity"
          onChange={props.onChange}
          value={props.centerData.capacity}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-center" className=" home-para">
          Owner:
        </label>
        <input
          className="form-control"
          type="text"
          id="example-text-input"
          name="owner"
          onChange={props.onChange}
          value={props.centerData.owner}
        />
      </div>
      <div className="form-group">
        <label htmlFor="event-details" className=" home-para">
          {' '}
          Description:
        </label>
        <textarea
          className="form-control"
          id="eventTextarea"
          rows="8"
          name="description"
          onChange={props.onChange}
          value={props.centerData.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="add-center" className=" home-para">
          Upload an Image of event center below:
        </label>
        <input
          type="file"
          className="form-control-file"
          onChange={props.onImageChange}
          id="input-file"
          name="images"
          aria-describedby="fileHelp"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-sm" id="save-event">
        Update Center<span>
          <i className="fa fa-paper-plane" aria-hidden="true" />
        </span>
      </button>
    </form>
  </div>
);

export default EditCenterComponent;
