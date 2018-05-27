/* module */

const APP_BASE_URL = 'http://localhost:5050';

module.exports = {
  'User should be able to see the landing page': browser => {
    browser
      .url(APP_BASE_URL)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(2000);
  },
  'User should see the navigation bar and the brand logo': browser => {
    browser.assert
      .visible('body')
      .assert.visible('#nav-bar')
      .assert.visible('#nav-logo')
      .assert.containsText('#nav-logo', 'Events Manager!')
      .assert.visible('#navbar-myevents');
  },
  'User should be able to click the signin button/link on the landing page': browser => {
    browser
      .pause(2000)
      .assert.visible('#signin')
      .assert.containsText('#signin', 'signin')
      .click('#signin');
  },
  'User should be able to see the brand logo & intro on sign-in page': browser => {
    browser.assert
      .visible('#signin-event')
      .assert.containsText('#signin-event', 'Events Manager')
      .assert.visible('#h2-signin')
      .assert.containsText('#h2-signin', 'Welcome!')
      .assert.visible('.signup-text')
      .assert.containsText(
        '.signup-text',
        'Please fill the form below to login'
      )
      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', 'E-Mail Address')
      .assert.visible('div > input[name=email]')
      .setValue('div > input[name=email]', 'faith.andela@andela.com')
      .pause(1000)
      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', 'Password')
      .assert.visible('div > input[name=password]')
      .setValue('div > input[name=password]', '11111111')
      .pause(1000)
      .assert.visible('#signin-btn')
      .click('#signin-btn')
      .pause(2000);
  },
  'User should see the buttons on the navigation bar': browser => {
    browser.assert
      .visible('.navbar-nav.ml-auto')
      .assert.visible('#user-getcenters')
      .assert.containsText('#user-getcenters', 'Centers')
      .assert.visible('#user-addevent')
      .assert.containsText('#user-addevent', 'Add Events')
      .assert.visible('#user-event')
      .assert.containsText('#user-event', 'Events')
      .assert.visible('#user-myevents')
      .assert.containsText('#user-myevents', 'My Events')
      .assert.visible('#user-logout')
      .assert.containsText('#user-logout', 'Sign Out')
      .pause(2000);
  },
  'User should be able to a 404 page when there are no events on myEvents page ': browser => {
    browser.assert
      .visible('div > h1')
      // .assert.containsText('div > h1', 'My Events')
      .end();
  }
};
