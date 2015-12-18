/**
 * grunt-contrib-connect options
 * @type {Object}
 */

module.exports = {
  options: {
    // change this to '0.0.0.0' to access the server from outside
    hostname: 'localhost',
    open: false
  },
  dist: {
    options: {
      port: 3000,
      keepalive: false,
      base: [
        '<%- folders.dist %>'
      ],
      livereload: false
    }
  },
  testresults: {
    options: {
      port: 9001,
      base: [
        'report/'
      ],
      livereload: false,
      keepalive: true,
      open: 'http://localhost:9001/report.html'
    }
  }
};
