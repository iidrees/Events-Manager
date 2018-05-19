import React from 'react';
import { Link } from 'react-router-dom';

const GetCentersComponent = props => (
  <div className="container" id="centerbottom">
    <div className="row">
      {props.centers.centers.map(center => {
        return (
          <div className="col-sm-12 col-md-6 col-lg-4" key={center.id}>
            <div className="card-deck cont-body" id="card-center1">
              <div className="card" id="card1" style={{ width: '18rem' }}>
                {props.userId !== center.userId ? (
                  <img
                    className="card-img-top img-fluid"
                    src={`${center.imgUrl}`}
                    alt="Card image cap"
                  />
                ) : (
                  <Link to={`/centerdetails/${center.id}`}>
                    <img
                      className="card-img-top img-fluid"
                      src={`${center.imgUrl}`}
                      alt="Center image"
                    />
                  </Link>
                )}
                <div
                  className="card-body"
                  style={{ borderBottom: 'solid grey 0.5px' }}
                >
                  <h5 className="card-title even-font">
                    <span className="all-centers-font">Center: </span>
                    {center.name}
                  </h5>

                  <p className=" card-title location-font">
                    <span className="all-centers-font">LOCATION: </span>
                    {center.location}
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

export default GetCentersComponent;
