import React from 'react';
import { Link } from 'react-router-dom';

const EventComponent = props => (
  <div className="container">
    <div className="row">
      {props.events.events.map(event => {
        return (
          <div className="col-sm-12 col-md-6 col-lg-4" key={event.id}>
            <div className="card-deck cont-body" id="card-body">
              <div className="card" style={{ width: '18rem' }}>
                {props.userId !== event.userId ? (
                  <img
                    className="card-img-top img-fluid"
                    src={`${event.imgUrl}`}
                    alt="Card image cap"
                  />
                ) : (
                  <Link to={`/eventdetails/${event.id}`}>
                    <img
                      className="card-img-top img-fluid"
                      src={`${event.imgUrl}`}
                      alt="Card image cap"
                    />
                  </Link>
                )}
                <div
                  className="card-body"
                  style={{ borderBottom: 'solid grey 0.5px' }}
                >
                  <h5 className="card-title even-font">
                    <span className="">Event: </span>
                    {event.title}
                  </h5>
                  <p className=" even-font">
                    <span>LOCATION: </span>
                    {event.center}
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

export default EventComponent;
