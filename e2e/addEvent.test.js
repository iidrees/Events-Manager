/* module */

const APP_BASE_URL = 'http://localhost:5050';

const addEvent = browser => {
  // 'User should be able to see the landing page'
  browser
    .url(APP_BASE_URL)
    .waitForElementVisible('body', 5000)
    .assert.urlEquals(`${APP_BASE_URL}/`)
    .pause(2000);

  // 'User should see the navigation bar and the brand logo'
  browser.assert
    .visible('body')
    .assert.visible('#nav-bar')
    .assert.visible('#nav-logo')
    .assert.containsText('#nav-logo', 'Events Manager!')
    .assert.visible('#navbar-myevents');

  // 'User should be able to click the signin button/link on the landing page'
  browser
    .pause(2000)
    .assert.visible('#signin')
    .assert.containsText('#signin', 'signin')
    .click('#signin');

  // 'User should be able to see the brand logo & intro on sign-in page'
  browser.assert
    .visible('#signin-event')
    .assert.containsText('#signin-event', 'Events Manager')
    .assert.visible('#h2-signin')
    .assert.containsText('#h2-signin', 'Welcome!')
    .assert.visible('.signup-text')
    .assert.containsText('.signup-text', 'Please fill the form below to login')
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

  // 'User should see the buttons on the navigation bar'
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

  // 'User should show a 404 page when there are no events on myEvents page '
  browser.assert
    .visible('div > h1')
    .assert.containsText('div > h1', 'You Have No Event');

  // 'Should prompt user to fill the empty Name field'
  browser
    .click('#user-addevent')
    .pause(2000)
    .assert.visible('div > #add-event-header > .row > div > h1')
    .assert.containsText(
      'div > #add-event-header > .row > div > h1',
      'Add your events'
    )
    .assert.visible('div > #add-event-header > .row > div > p')
    .assert.containsText(
      'div > #add-event-header > .row > div > p',
      'Are you in need of a location to host your event? If yes, then why not host your events using one of our numerous event centers by creating an event below?'
    )
    .pause(1000)
    .assert.visible('form[role=form]')
    .assert.visible('div > label[for=add-event]')
    .assert.containsText('div > label[for=add-event]', 'Name of Event:')
    .assert.visible('div > input[name=title]')
    .setValue('div > input[name=title]', '')
    .click('#save-event1')
    .pause(1000)
    .click('#save-event1')
    .pause(1000)
    .assert.visible('div > input[name=startDate]')
    .setValue('div > input[name=startDate]', '')
    .assert.visible('div > input[name=endDate]')
    .setValue('div > input[name=endDate]', '')
    .assert.visible('div > #add-event-form4')
    .assert.visible("select[name=center] option[value='2']")
    .click('select[name=center] ')
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', '')
    .assert.visible('input[name=images]')
    .setValue('input[type=file]', '')
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(2000);

  // 'Should prompt user when no date is entered'
  browser
    .pause(1000)
    .assert.visible('div > input[name=title]')
    .setValue('div > input[name=title]', 'The Simulations Party!')
    .pause(1000)
    .assert.visible('div > input[name=startDate]')
    .setValue('div > input[name=startDate]', '')
    .assert.visible('div > input[name=endDate]')
    .setValue('div > input[name=endDate]', '')
    .assert.visible('div > #add-event-form4')
    .assert.visible("select[name=center] option[value='2']")
    .click('select[name=center] ')
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', '')
    .assert.visible('input[name=images]')
    .setValue('input[type=file]', '')
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(2000);

  // 'Should prompt user to pick a center'
  browser
    .pause(1000)
    .assert.visible('div > input[name=startDate]')
    .setValue('div > input[name=startDate]', '10/02/2019')
    .assert.visible('div > input[name=endDate]')
    .setValue('div > input[name=endDate]', '16/02/2019')
    .assert.visible('div > #add-event-form4')
    .assert.visible("select[name=center] option[value='2']")
    .click('select[name=center]')
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(2000);

  // 'Should prompt user when no description is entered'
  browser
    .pause(1000)
    .assert.visible("select[name=center] option[value='2']")
    .click("select[name=center] option[value='2']")
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', '')
    .assert.visible('input[name=images]')
    .setValue('input[type=file]', '')
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(2000);

  // 'Should prompt user when no image'
  browser
    .pause(1000)
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', 'Lorem Ipsum and shit')
    .assert.visible('input[name=images]')
    .setValue('input[type=file]', '')
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(2000);

  // 'User should be prompted to enter a valid date'
  browser
    .pause(2000)
    .assert.visible('div > input[name=title]')
    .setValue('div > input[name=title]', 'The Simulations Party!')
    .pause(1000)
    .assert.visible('div > input[name=startDate]')
    .setValue('div > input[name=startDate]', '10/02/2018')
    .assert.visible('div > input[name=endDate]')
    .setValue('div > input[name=endDate]', '16/02/2018')
    .assert.visible('div > #add-event-form4')
    .assert.visible("select[name=center] option[value='2']")
    .click("select[name=center] option[value='2']")
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', 'Lorem Ipsum dolor sit amet')
    .assert.visible('input[name=images]')
    .setValue(
      'input[type=file]',
      '/Users/idreesibraheem/Desktop/pexels-photo-296878.jpeg'
    )
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(15000);

  // 'User should be able to add an event'
  browser
    .pause(2000)
    .assert.visible('div > #add-event-header > .row > div > h1')
    .assert.containsText(
      'div > #add-event-header > .row > div > h1',
      'Add your events'
    )
    .assert.visible('div > #add-event-header > .row > div > p')
    .assert.containsText(
      'div > #add-event-header > .row > div > p',
      'Are you in need of a location to host your event? If yes, then why not host your events using one of our numerous event centers by creating an event below?'
    )
    .pause(1000)
    .pause(2000)
    .assert.visible('div > input[name=title]')
    .setValue('div > input[name=title]', 'The Simulations Party!')
    .pause(1000)
    .assert.visible('div > input[name=startDate]')
    .setValue('div > input[name=startDate]', '10/02/2019')
    .assert.visible('div > input[name=endDate]')
    .setValue('div > input[name=endDate]', '16/02/2019')
    .assert.visible('div > #add-event-form4')
    .assert.visible("select[name=center] option[value='2']")
    .click("select[name=center] option[value='2']")
    .assert.visible('#add-event-form5')
    .setValue('#add-event-form5', 'Lorem Ipsum dolor sit amet')
    .assert.visible('input[name=images]')
    .setValue(
      'input[type=file]',
      '/Users/idreesibraheem/Desktop/pexels-photo-296878.jpeg'
    )
    .pause(1000)
    .assert.visible('#save-event1')
    .click('#save-event1')
    .pause(20000)
    .end();
};

export default addEvent;
