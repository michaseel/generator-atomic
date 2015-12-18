/**
 * grunt-contrib-clean options
 * @type {Object}
 */

module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '<%- folders.tmp %>',
        '<%- folders.dist %>/*',
        '!<%- folders.dist %>/.git*'
      ]
    }]
  },
  server: '<%- folders.tmp %>'
};
