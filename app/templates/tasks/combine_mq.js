/**
 * grunt-combine-mq options
 * @type {Object}
 */

module.exports = {
  options: {
    log: true
  },
  dist: {
    expand: true,
    cwd: '<%- folders.tmp %>/concat/0_basics/',
    src: '*.css',
    dest: '<%- folders.tmp %>/concat/0_basics/'
  }
};
