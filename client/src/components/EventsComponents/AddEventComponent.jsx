import React from 'react';

const AddEventComponent = props => (
  <div className="container">
    {/* <!-- Start container for Add Form --> */}
    <div className="row">
      <div className="col-sm-12">
        <form
          method="POST"
          className="form-horizontal"
          onSubmit={props.onSubmit}
          role="form"
        >
          {/* <!-- ADD FORM --> */}
          <div className="form-group">
            <label htmlFor="add-event" className=" home-para">
              Name of Event:
            </label>
            <input
              className="form-control"
              onChange={props.onChange}
              name="title"
              id="form-event1"
              type="text"
              placeholder=""
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-event" className=" home-para">
              Date of event:
            </label>
            <input
              className="form-control"
              onChange={props.onChange}
              name="date"
              type="date"
              id="form-event2"
              placeholder="YY/MM/DD"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-centers" className=" home-para">
              Center:
            </label>
            <select
              className="form-control"
              id="event-center1"
              onChange={props.onChange}
              name="center"
              required
            >
              <option className="home-para">Choose an event center</option>
              {props.centers.map(center => {
                return (
                  <option
                    key={center.id}
                    value={center.id}
                    className="home-para"
                  >
                    {center.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="event-details" className=" home-para">
              Events description:
            </label>
            <textarea
              className="form-control"
              onChange={props.onChange}
              id="form-event4"
              rows="8"
              name="description"
              placeholder="brief details about the event"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-event" className=" home-para">
              Upload an Image of your event below:
            </label>
            <input
              type="file"
              className="form-control-file"
              onChange={props.onImageChange}
              id="input-file"
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
            Save and create event{' '}
            <span>
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </span>
          </button>
        </form>
      </div>
      {/* <!-- End Container ADD EVENTS FORM --> */}
    </div>
  </div>
);

export default AddEventComponent;
