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
  'User should see the buttons on the navigation bar': browser => {
    browser.assert
      .visible('.navbar-nav.ml-auto')
      .assert.visible('#signup')
      .assert.containsText('#signup', 'signup')
      .assert.visible('#signin')
      .assert.containsText('#signin', 'signin');
  },
  'User should be able to click the signup button/link on the landing page': browser => {
    browser
      .pause(2000)
      .assert.visible('#signup')
      .pause(2000)
      .click('#signup')
      .pause(2000)
      .assert.visible('#signin')
      .assert.containsText('#signin', 'signin');
  },
  'User should be able to see the brand logo & intro on sign-up page': browser => {
    browser.assert
      .visible('#signup-event')
      .assert.containsText('#signup-event', 'Events Manager')
      .assert.visible('#h3-signup')
      .assert.containsText('#h3-signup', "Let's get started")
      .assert.visible('.signup-text')
      .assert.containsText(
        '.signup-text',
        'enter your name, email and password to Sign-up'
      );
  },
  'User should be prompted to enter their name': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .setValue('div > input[name=name]', '')
      .pause(1000)

      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', '')
      .assert.visible('div > input[name=email]')
      .setValue('div > input[name=email]', '')
      .pause(1000)

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', '')
      .assert.visible('div > input[name=password]')
      .setValue('div > input[name=password]', '')
      .pause(1000)
      .assert.visible('div > label[for=password]')

      .assert.visible('div > input[name=confirmPassword]')
      .setValue('div > input[name=confirmPassword]', '')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to enter their email': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .setValue('div > input[name=name]', 'Felix')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to enter their password': browser => {
    browser.assert
      .visible('#form-signup')
      .pause(1000)
      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', '')
      .assert.visible('div > input[name=email]')
      .setValue('div > input[name=email]', 'felix.amande@andela.com')
      .pause(1000)
      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', '')
      .assert.visible('div > input[name=password]')
      .setValue('div > input[name=password]', '')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to confirm their password': browser => {
    browser.assert
      .visible('#form-signup')
      .pause(1000)

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', '')
      .assert.visible('div > input[name=password]')
      .setValue('div > input[name=password]', '11111111')
      .pause(1000)
      .assert.visible('div > label[for=password]')
      .assert.visible('div > input[name=confirmPassword]')
      .setValue('div > input[name=confirmPassword]', '')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to enter a valid email address': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .setValue('div > input[name=name]', 'Felix')
      .pause(1000)
      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', 'E-Mail Address')
      .clearValue('input[name=email]')
      .assert.visible('div > input[name=email]')
      .setValue('div > input[name=email]', 'felix.ama902940^,ams')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to enter a valid email': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .clearValue('input[name=name]')
      .setValue('div > input[name=name]', 'Felix')
      .pause(1000)
      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', 'E-Mail Address')
      .clearValue('input[name=email]')
      .assert.visible('div > input[name=email]')
      .setValue('div > input[name=email]', 'felix.amande@andela')

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', 'Password')
      .assert.visible('div > input[name=password]')
      .clearValue('input[name=password]')
      .pause(1000)
      .setValue('div > input[name=password]', '11111111')
      .pause(1000)
      .assert.visible('div > label[for=password]')

      .assert.visible('div > input[name=confirmPassword]')
      .clearValue('input[name=confirmPassword]')
      .pause(1000)
      .setValue('div > input[name=confirmPassword]', '11111111')
      .pause(1000)
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted to enter a password that is 8 or more characters': browser => {
    browser.assert
      .visible('#form-signup')

      .assert.visible('div > label[for=email]')
      .assert.containsText('div > label[for=email]', 'E-Mail Address')
      .assert.visible('div > input[name=email]')
      .clearValue('input[name=email]')
      .setValue('div > input[name=email]', 'felix.amande@andela.com')
      .pause(1000)

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', 'Password')
      .assert.visible('div > input[name=password]')
      .clearValue('input[name=password]')
      .pause(1000)
      .setValue('div > input[name=password]', '1111')
      .pause(1000)
      .assert.visible('div > label[for=password]')
      .assert.visible('div > input[name=confirmPassword]')
      .clearValue('input[name=confirmPassword]')
      .pause(1000)
      .setValue('div > input[name=confirmPassword]', '1111')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be prompted that their password does not match': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .clearValue('input[name=name]')
      .pause(1000)
      .setValue('div > input[name=name]', 'Felix')
      .pause(1000)

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', 'Password')
      .assert.visible('div > input[name=password]')
      .clearValue('input[name=password]')
      .pause(1000)
      .setValue('div > input[name=password]', '11111111')
      .pause(1000)
      .assert.visible('div > label[for=password]')

      .assert.visible('div > input[name=confirmPassword]')
      .clearValue('input[name=confirmPassword]')
      .pause(1000)
      .setValue('div > input[name=confirmPassword]', '11222111')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000);
  },
  'User should be able to signup': browser => {
    browser.assert
      .visible('#form-signup')
      .assert.visible('div > label[for=name]')
      .assert.containsText('div > label[for=name]', 'Name')
      .assert.visible('div > input[name=name]')
      .clearValue('input[name=name]')
      .setValue('div > input[name=name]', 'Felix')
      .pause(1000)

      .assert.visible('div > label[for=password]')
      .assert.containsText('div > label[for=password]', 'Password')
      .assert.visible('div > input[name=password]')
      .clearValue('input[name=password]')
      .pause(1000)
      .setValue('div > input[name=password]', '11111111')
      .pause(1000)
      .assert.visible('div > label[for=password]')

      .assert.visible('div > input[name=confirmPassword]')
      .clearValue('input[name=confirmPassword]')
      .pause(1000)
      .setValue('div > input[name=confirmPassword]', '11111111')
      .pause(1000)
      .assert.visible('#signup-btn')
      .click('#signup-btn')
      .pause(2000)
      .end();
  }
};
