import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CenterDetailsBodyComponent = props => (
  <div className="container" id="event-holding">
    <div className="row">
      {props.center.events.map(event => {
        return (
          <div className="col-md-6 col-sm-4 col-lg-4" key={event.id}>
            <div className="card-deck cont-body" id="center-details-events">
              <div className="card" style={{ width: '18rem' }}>
                <div className="img-details-new">
                  <img
                    className="card-img-top"
                    src={`${event.imgUrl}`}
                    alt="Card image cap"
                  />
                </div>
                {''}

                <div className="card-body">
                  <h5 className="card-title even-font">
                    <span />
                    {event.title}
                  </h5>
                  {event.isCancelled ? (
                    <p className="card-title date-font">
                      {' '}
                      <span>Event Status: </span>
                      Event Cancelled
                    </p>
                  ) : (
                    <div>
                      {' '}
                      <p className="card-title date-font">
                        <span>Event starts on :</span>{' '}
                        <Moment format="DD MMMM YYYY">{event.startDate}</Moment>
                      </p>
                      <p className="card-title date-font">
                        <span>Event ends on:</span>{' '}
                        <Moment format="DD MMMM YYYY">{event.endDate}</Moment>
                      </p>
                      {props.userId === props.center.center.userId && (
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ float: 'right' }}
                          type="button"
                          name="cancel"
                          onClick={e => {
                            e.preventDefault();
                            return props.onCancel(event.id);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
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
