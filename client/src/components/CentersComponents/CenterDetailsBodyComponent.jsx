import React from 'react';
import { Link } from 'react-router-dom';

const CenterDetailsBodyComponent = props => (
  <div className="container" id="event-holding">
    <div className="row">
      {props.center.events.map(event => {
        return (
          <div className="col-md-6 col-sm-4 col-lg-4" key={event.id}>
            <div className="card-deck cont-body" id="center-details-events">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  className="card-img-top image-show"
                  src={`${event.imgUrl}`}
                  alt="Card image cap"
                />
                <br />
                <div className="card-body">
                  <h5 className="card-title even-font">
                    <span>Event:</span>
                    {event.title}
                  </h5>
                  <p className="card-title date-font">
                    <span>DATE:</span>
                    {event.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CenterDetailsBodyComponent;
