/* module */

const APP_BASE_URL = 'http://localhost:5050';

const signIn = browser => {
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
    .assert.containsText('.signup-text', 'Please fill the form below to login');

  // 'User should be to prompted to enter a valid email'
  browser.assert
    .visible('div > label[for=email]')
    .assert.containsText('div > label[for=email]', 'E-Mail Address')
    .assert.visible('div > input[name=email]')
    .setValue('div > input[name=email]', 'faith.andela@andela')
    .pause(1000)
    .assert.visible('div > label[for=password]')
    .assert.containsText('div > label[for=password]', 'Password')
    .assert.visible('div > input[name=password]')
    .setValue('div > input[name=password]', '22221111')
    .pause(1000)
    .assert.visible('#signin-btn')
    .click('#signin-btn')
    .pause(2000);

  // 'User should be prompted they entered an incorrect username or password '
  browser.assert
    .visible('div > label[for=email]')
    .assert.containsText('div > label[for=email]', 'E-Mail Address')
    .assert.visible('div > input[name=email]')
    .pause(1000)
    .clearValue('input[name=email]')
    .pause(1000)
    .setValue('div > input[name=email]', 'faith.andela@andela.com')
    .pause(1000)
    .assert.visible('div > label[for=password]')
    .assert.containsText('div > label[for=password]', 'Password')
    .assert.visible('div > input[name=password]')
    .setValue('div > input[name=password]', '222211')
    .pause(1000)
    .assert.visible('#signin-btn')
    .click('#signin-btn')
    .pause(2000);

  // 'User should be able to see the form on page and signin'
  browser
    .pause(1000)
    .assert.visible('div > label[for=email]')
    .assert.containsText('div > label[for=email]', 'E-Mail Address')
    .assert.visible('div > input[name=email]')
    .clearValue('input[name=email]')
    .pause(1000)
    .setValue('div > input[name=email]', 'faith.andela@andela.com')
    .pause(1000)
    .assert.visible('div > label[for=password]')
    .assert.containsText('div > label[for=password]', 'Password')
    .clearValue('input[name=password]')
    .pause(1000)
    .assert.visible('div > input[name=password]')
    .setValue('div > input[name=password]', '22221111')
    .pause(1000)
    .assert.visible('#signin-btn')
    .click('#signin-btn')
    .pause(2000)
    .end();
};

export default signIn;
