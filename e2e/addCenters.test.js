/* module */

const APP_BASE_URL = 'http://localhost:5050';

const addCenters = browser => {
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
    .setValue('div > input[name=email]', 'idreeskun@kun.com')
    .pause(1000)
    .assert.visible('div > label[for=password]')
    .assert.containsText('div > label[for=password]', 'Password')
    .assert.visible('div > input[name=password]')
    .setValue('div > input[name=password]', 'wordpass')
    .pause(1000)
    .assert.visible('#signin-btn')
    .click('#signin-btn')
    .pause(2000);

  // 'User should see the buttons on the navigation bar'
  browser.assert
    .visible('.navbar-nav.ml-auto')
    .assert.visible('#admin-getcenters')
    .assert.containsText('#admin-getcenters', 'Centers')
    .assert.visible('#admin-addcenter')
    .assert.containsText('#admin-addcenter', 'Add Center')
    .assert.visible('#admin-logout')
    .assert.containsText('#admin-logout', 'Sign Out')
    .pause(2000);

  // 'User should be navigated to the Centers after signin '
  browser.assert
    .visible('#p-head')
    .assert.containsText(
      '#p-head',
      'Are you looking for a location to host your events?'
    )
    .pause(2000);

  // 'User should be prompted to fill the input field'
  browser
    .pause(1000)
    .click('#admin-addcenter')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should be prompted to enter the location of the center'
  browser
    .pause(1000)
    .assert.visible('input[name=name]')
    .setValue('input[name=name]', 'Karashika Center')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should be prompted to enter capacity'
  browser
    .pause(1000)
    .assert.visible('input[name=location]')
    .setValue('input[name=location]', 'Ikeja ICM')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should be prompted to enter the Owner'
  browser
    .pause(1000)
    .assert.visible('input[name=capacity]')
    .setValue('input[name=capacity]', '3000')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should be prompted to enter the Description'
  browser
    .pause(1000)
    .assert.visible('input[name=owner]')
    .setValue('input[name=owner]', 'Moe-Baba')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should be prompted to upload an image'
  browser
    .pause(1000)
    .assert.visible('textarea[name=description]')
    .setValue('textarea[name=description]', 'Lorem Ipsum this my friend.')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(2000);

  // 'User should not be able to use letters as center capacity'
  browser
    .pause(1000)
    .assert.visible('input[name=images]')
    .setValue(
      'input[type=file]',
      '/Users/idreesibraheem/Desktop/pexels-photo-296878.jpeg'
    )
    .pause(1000)
    .clearValue('input[name=capacity]')
    .pause(2000)
    .setValue('input[name=capacity]', 'edsffdd')
    .pause(1000)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(15000);

  // 'User should be able to add a new center'
  browser
    .pause(1000)
    .click('input[name=name]')
    .pause(1000)
    .assert.visible('input[name=name]')
    .setValue('input[name=name]', 'Karashika Center')
    .pause(1000)
    .assert.visible('input[name=location]')
    .setValue('input[name=location]', 'Ikeja ICM')
    .pause(2000)
    .setValue('input[name=capacity]', '2000')
    .pause(1000)
    .assert.visible('input[name=owner]')
    .setValue('input[name=owner]', 'Moe-Baba')
    .pause(1000)
    .assert.visible('textarea[name=description]')
    .setValue('textarea[name=description]', 'Lorem Ipsum this my friend.')
    .pause(1000)
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
};

export default addCenters;
