/* global module, require */
require('babel-register');
module.exports = (settings => {
  settings.testWorkers = false;
  return settings;
})(require('./nightwatch.json'));
