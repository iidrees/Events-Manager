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
      .assert.visible('#event-det-1')
      .click('#event-det-1')
      .pause(1000)
      .click('#event-det-1')
      .pause(1000)
      .assert.visible('#myevent')
      .pause(1000)
      .assert.visible('.details-event')
      .pause(1000)
      .assert.containsText(
        '.phead.head1.text-center.details-event',
        'Check event below.'
      )
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
      .pause(3000);
  },
  'User should be able to Edit an event': browser => {
    browser
      // .click('#user-addevent')
      .pause(2000)
      .assert.visible('div > #add-event-header > .row > div > h1')
      .assert.containsText(
        'div > #add-event-header > .row > div > h1',
        'Edit your event'
      )

      .pause(1000)
      .assert.visible('form[role=form]')
      .assert.visible('div > label[for=add-event]')
      .assert.containsText('div > label[for=add-event]', 'Name of Event:')
      .assert.visible('div > input[name=title]')
      .pause(1000)
      .clearValue('input[name=title]')
      .pause(1000)
      .setValue('div > input[name=title]', 'The New XYZ Party')
      .pause(1000)
      .assert.visible('div > input[name=startDate]')
      .pause(1000)
      .clearValue('input[name=startDate]')
      .pause(1000)
      .setValue('div > input[name=startDate]', '10/07/2019')
      .assert.visible('div > input[name=endDate]')
      .pause(1000)
      .clearValue('input[name=endDate]')
      .pause(1000)
      .setValue('div > input[name=endDate]', '16/07/2019')
      .assert.visible('div > #event-center1')
      .assert.visible("select[name=center] option[id='2']")
      .click("select[name=center] option[id='2']")
      .assert.visible('#form-event4')
      .clearValue('textarea[name=description]')
      .pause(1000)
      .setValue('#form-event4', 'Lorem Ipsum dolor sit amet')
      .assert.visible('input[name=images]')
      .setValue(
        'input[type=file]',
        '/Users/idreesibraheem/Desktop/pexels-photo-296878.jpeg'
      )
      .pause(1000)
      .assert.visible('#save-event')
      .click('#save-event')
      .pause(15000)
      .end();
  }
};
