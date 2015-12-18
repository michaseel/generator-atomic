/**
 * grunt-karma options
 * @type {Object}
 */

module.exports = {
  unit: {
    configFile: 'tests/karma.conf.js',
    singleRun: true,
    port: 9002,
    browsers: ['PhantomJS']
  }
};
