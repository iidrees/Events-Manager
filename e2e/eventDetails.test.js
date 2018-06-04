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
      .setValue('div > input[name=password]', '22221111')
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
      .assert.visible('#user-myevents')
      .assert.containsText('#user-myevents', 'My Events')
      .assert.visible('#user-logout')
      .assert.containsText('#user-logout', 'Sign Out')
      .pause(2000);
  },
  'User should be able to see the details of an event and interact with buttons': browser => {
    browser
      .pause(2000)
      .assert.visible('#event-det-3')
      .click('#event-det-3')
      .pause(500)
      .click('#event-det-3')
      .assert.visible('#myevent')
      .assert.visible('div > div > #myevent > div > div > div > div > #p-head')
      .assert.containsText('.phead.head1.text-center', 'Check event below.')
      .assert.visible('img[id=img-details]')
      .assert.visible('.btn.btn-danger')
      .assert.visible('button[name=del-event')
      .pause(1000)
      .click('button[name=del-event')
      .pause(5000)
      .assert.visible('button[name=del-decline]')
      .pause(1000)
      .click('button[name=del-decline]')
      .pause(1000)
      .assert.visible('#ed-event')
      .pause(1000)
      .click('#ed-event')
      .pause(5000)
      .end();
  }
};
