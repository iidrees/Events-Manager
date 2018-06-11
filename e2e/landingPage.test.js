/* module */

const APP_BASE_URL = 'http://localhost:5050';

// module.exports = {
//   'User should be able to see the landing page': browser => {
const landing = browser => {
  browser
    .url(APP_BASE_URL)
    .waitForElementVisible('body', 5000)
    .assert.urlEquals(`${APP_BASE_URL}/`)
    .pause(2000);

  // 'User should see the navigation bar and the brand logo': browser => {
  browser.assert
    .visible('body')
    .assert.visible('#nav-bar')
    .assert.visible('#nav-logo')
    .assert.containsText('#nav-logo', 'Events Manager!')
    .assert.visible('#navbar-myevents');

  // 'User should see the buttons on the navigation bar': browser => {
  browser.assert
    .visible('.navbar-nav.ml-auto')
    .assert.visible('#signup')
    .assert.containsText('#signup', 'signup')
    .assert.visible('#signin')
    .assert.containsText('#signin', 'signin');

  // 'User should see the landing body': browser => {
  browser.assert
    .visible('#landing-background')
    .assert.visible('#heading')
    .assert.containsText('#heading > h1', 'Events Manager')
    .assert.visible('#body-landing')
    .assert.containsText(
      '#body-landing > .row > div > p',
      'For All Event Planners, Party-Goers, And Owambe Finders'
    );

  // 'User should see the footer': browser => {
  browser.assert
    .visible('.footer')
    .assert.visible('#footer-para')
    .assert.visible('#red-footer')
    .assert.containsText(
      '#footer-para > strong',
      'Made with by Idrees Ibraheem © 2018'
    )
    .end();
};

export default landing;
