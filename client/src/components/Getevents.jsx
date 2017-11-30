import React from 'react';

export default () => {
  return (
    <div className="row">
      <div className="container" id="event-page">{/* <!-- START BODY-HEADER WITH SEARCH FORM --> */}
        <div className="row">
          <div className="col-sm-12">
              <h1 className=" head1 text-center">Find Your Next Event</h1>
              <p id="p-head" className="head1 text-center">Popular events in Lagos</p>
              <hr />
              <form className="text-right" method='POST' action='#'>
                <p className="search-font">Looking for a particular event? <br /> enter your search below </p>
                <input id="event-search" type="text" name="search" placeholder="Enter Your Search Here..." />
              </form>						
          </div>
        </div>
      </div>{/* END BODY-HEADER WITH SEARCH FORM  */}
    
    
    <div className="container" >			
        <div className="row">
          <div className="col-sm-9">
            <div className="card-deck" id="cadcad-body" >
              <div className="card" id="card1" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/media/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span >Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
              <div className="card" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/media/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span className="">Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
              <div className="card" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/components/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span className="">Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
            </div>
          </div>				
        </div>			
      </div>
      <div className="container" id="cadcad">			
        <div className="row">
          <div className="col-sm-9">
            <div className="card-deck"  >
              <div className="card" id="card1" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/components/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span >Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
              <div className="card" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/components/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span className="">Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
              <div className="card" style={{height: "10rem"}}>
                <a href="event.html"><img className="card-img-top" src="./src/components/images/events-center.jpg" alt="Card image cap" /></a>
                <div className="card-block" style={{borderBottom: "solid grey 0.5px"}}>
                  <h5 className="card-title even-font">
                    <span className="">Event:</span>
                    FELABRATION!
                  </h5>
                  <p className="card-title date-font">
                      <span>DATE:</span>
                    SAT. DEC 18 9:00 PM</p>
                  <p className=" location-font">
                      <span>LOCATION:</span>
                    Ikeja Shrine</p>
                  <p className="card-text">
                      <span>tags:</span>
                    <small className="text-muted">#Shrine</small></p>
                </div>              
              </div>
            </div>
          </div>				
        </div>			
      </div>
    </div>	
  );
}