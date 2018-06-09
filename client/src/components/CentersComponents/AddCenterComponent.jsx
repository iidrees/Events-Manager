import React from 'react';
import { Link } from 'react-router-dom';

const AddCenterComponent = props => (
  <div className="container">
    {/* <!-- Start container for Add Form --> */}
    <div className="row">
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
              placeholder="Enter Name of Center"
              id="example-text-input1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-center" className=" home-para">
              Location:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder=" Enter Location"
              id="example-text-input2"
              name="location"
              onChange={props.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-center" className=" home-para">
              Capacity:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Capacity"
              id="example-text-input3"
              name="capacity"
              onChange={props.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-center" className=" home-para">
              Owner:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Owner"
              id="example-text-input4"
              name="owner"
              onChange={props.onChange}
              required
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
              placeholder="brief details about the event"
              name="description"
              onChange={props.onChange}
              required
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
              id="file-center1"
              name="images"
              aria-describedby="fileHelp"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            id="save-event"
          >
            Save and create Event Center<span>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </span>
          </button>
        </form>
      </div>
    </div>
    {/* <!-- End Container ADD EVENTS FORM --> */}
  </div>
);

export default AddCenterComponent;
