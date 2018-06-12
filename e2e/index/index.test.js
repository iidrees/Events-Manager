/* browser */
// import editCenter from '../editCenter.test.js';
import landing from '../landingPage.test';
import signUp from '../signUp.test';
import signIn from '../signIn.test';
import myEvents from '../myEvents.test';
import addEvent from '../addEvent.test';
import eventDetails from '../eventDetails.test';
import addCenters from '../addCenters.test';
import centers from '../centers.test';
import editCenter from '../editCenter.test';

module.exports = {
  'User should be able to interact with the landing pagepage': browser => {
    landing(browser);
  },
  'User should be able to signup as an ordinary user': browser => {
    signUp(browser);
  },
  'User should be able to signin as an ordinary user': browser => {
    signIn(browser);
  },
  'User should be able to see their event page': browser => {
    myEvents(browser);
  },
  'User should be able to add an event': browser => {
    addEvent(browser);
  },
  'User should be able to see details and edit and delete an event': browser => {
    eventDetails(browser);
  },
  'Admin user should be able to login and see the centers page': browser => {
    centers(browser);
  },
  'Admin user should be able to login and add center': browser => {
    addCenters(browser);
  },
  'Admin user should be able to edit a center they created': browser => {
    editCenter(browser);
  }
};
