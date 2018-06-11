/* module */

const APP_BASE_URL = 'http://localhost:5050';

const editCenter = browser => {
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

  // 'User should be able see the details of a center'
  browser
    .pause(2000)
    .assert.visible('#centers6')
    .moveToElement('#centers6', undefined, undefined)
    .pause(5000)
    .click('#centers6')
    .click('#centers6')
    .click('#centers6')
    .click('#centers6')
    .pause(1000)
    .pause(2000);

  // 'User should be able to edit a center'
  browser
    .pause(5000)
    .assert.visible('#center-edit-btn')
    .pause(1000)
    .click('#center-edit-btn')
    .pause(5000);

  // 'User should be able to upadte existing center'
  browser
    .pause(1000)
    .moveToElement('#admin-add-head', undefined, undefined)
    .pause(1000)
    .clearValue('input[name=name]')
    .pause(2000)
    .assert.visible('input[name=name]')
    .setValue('input[name=name]', 'The Moe Center')
    .pause(1000)
    .clearValue('input[name=location]')
    .assert.visible('input[name=location]')
    .setValue('input[name=location]', 'Ketu- Mile 12')
    .pause(2000)
    .clearValue('input[name=capacity]')
    .setValue('input[name=capacity]', '12000')
    .pause(1000)
    .clearValue('input[name=owner]')
    .assert.visible('input[name=owner]')
    .setValue('input[name=owner]', 'Moe-Mama')
    .clearValue('textarea[name=description]')
    .pause(1000)
    .assert.visible('textarea[name=description]')
    .setValue('textarea[name=description]', 'Lorem Ipsum this my friend.')
    .clearValue('input[name=images]')
    .pause(1000)
    .moveToElement('input[name=images]', undefined, undefined)
    .assert.visible('input[name=images]')
    .setValue(
      'input[type=file]',
      '/Users/idreesibraheem/Desktop/pexels-photo-296878.jpeg'
    )
    .pause(1000)
    .moveToElement('#save-event', undefined, undefined)
    .assert.visible('#save-event')
    .click('#save-event')
    .pause(15000)
    .assert.visible('#centers6')
    .pause(2000);

  // 'User should be able delete a center'
  browser
    .pause(2000)
    .assert.visible('#centers6')
    .click('#centers6')
    .pause(1000)

    .pause(1000)
    .click('button[name=pre-delete')
    .pause(5000)
    .assert.visible('button[name=del-center]')
    .click('button[name=del-center]')
    .pause(1000)
    .pause(2000)
    .end();
};

export default editCenter;
