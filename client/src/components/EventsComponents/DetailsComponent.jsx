import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

const DetailsComponent = props => (
  <div>
    <div className="container" id="details-ev">
      <div className="row">
        <div className="col-md-6">
          <img
            id="img-details"
            src={`${props.event.imgUrl}`}
            alt="felabration"
          />
        </div>
        <div className="col-md-6">
          <p className="font-details">
            <span>Event:</span> {props.event.title}
          </p>
          <p className="font-details">
            <span>Event starts on :</span>{' '}
            <Moment format="DD/MM/YYYY">{props.event.startDate}</Moment>
          </p>
          <p className="font-details">
            <span>Event ends on:</span>{' '}
            <Moment format="DD/MM/YYYY">{props.event.endDate}</Moment>
          </p>
          <p className="font-details">
            <span>Center:</span> {props.event.center}
          </p>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <p className="font-details text-center">
            <span className="font-span">Event Description</span>
            <br />
            {props.event.description}
          </p>
          <div className="detail-button">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#deleteEvent"
            >
              DELETE
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="deleteEvent"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="deleteEventLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteEventLabel">
                      <span className="modal-title">{props.event.title}</span>{' '}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    ARE YOU SURE YOU WANT TO DELETE THIS EVENT?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={props.onDelete}
                      data-dismiss="modal"
                      type="button"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span /> {''}
            <Link to={`/editevent/${props.event.id}`}>
              <button className="btn btn-primary" type="button">
                Edit Event
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsComponent;
