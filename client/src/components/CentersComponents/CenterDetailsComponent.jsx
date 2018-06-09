import React from 'react';
import { Link } from 'react-router-dom';

const CenterDetailsComponent = props => (
  <div>
    {/* <!-- START OF EVENT CENTER DETAILS --> */}
    <div className="row">
      <div className="col-md-6 col-sm-12 col-lg-6">
        <div className="img-details">
          <img
            id="img-details"
            src={`${props.center.center.imgUrl}`}
            alt="felabration"
          />
        </div>
      </div>

      <div className="col-md-9 col-sm-12 col-lg-6">
        <p className="center-details-span">
          <span className="">Center: </span>
          {props.center.center.name}
        </p>
        <p className="center-details-span">
          <span className="">Location: </span>
          {props.center.center.location}
        </p>
        <p className="center-details-span">
          <span className="">Capacity: </span>
          {props.center.center.capacity}
        </p>
        <p className="center-details-span">
          <span className="">Owner: </span>
          {props.center.center.owner}
        </p>
        <p className="center-details-span">
          <span className="">Description: </span>
          {props.center.center.description}
        </p>
        <p className="center-details-para" />
        {props.userId === props.center.center.userId ? (
          <div>
            <button
              type="button"
              className="btn btn-danger "
              data-toggle="modal"
              data-target="#deleteCenter"
            >
              DELETE
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="deleteCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="deleteCenterLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteCenterLabel">
                      {props.center.center.name}
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
                    {' '}
                    ARE YOU SURE YOU WANT TO DELETE THIS CENTER?
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
                      id="delete-center"
                      className="btn btn-warning"
                      data-dismiss="modal"
                      onClick={props.onDelete}
                      type="button"
                    >
                      Delete Center
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span /> {''}
            <Link
              to={`/editcenter/${props.center.center.id}`}
              id="center-edit-btn"
              role="button"
            >
              <button className="btn btn-primary" type="button">
                Edit Center
              </button>
            </Link>
          </div>
        ) : null}

        <span />
      </div>
    </div>
  </div>
);

export default CenterDetailsComponent;
