/**
 * grunt-babel options
 * @type {Object}
 */

module.exports = {
  options: {
    sourceMap: true
  },
  default: {
    files: [{
      expand: true,
      cwd: '<%- folders.app %>',
      dest: '<%- folders.tmp %>',
      src: [
        '{,*/,**/}*.js',
        '!bower_components/{,*/,**/}*.js',
        '!*.galen.js',
        '!*.unit.js'
      ]
    }]
  }
};
