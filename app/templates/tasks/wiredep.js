/**
 * grunt-wiredep options
 * @type {Object}
 */

module.exports = {
  app: {
    options: {
      ignorePath: /client\/|\.\.\//g,
      // Make sure everything has an absolute path (starts with '/')
      fileTypes: {
        jade: {
          replace: {
            js: 'script(src=\'/{{filePath}}\')',
            css: 'link(rel=\'stylesheet\', href=\'/{{filePath}}\')'
          }
        }
      },
      // packages to ignore
      exclude: [
        'bower_components/html5shiv/',
        'bower_components/consolelog/',
        'bower_components/modernizr/',
      ],
      overrides: {
      }
    },
    src: [
      '<%= folders.app %>/jade/_default.jade'
    ]
  },
  styles: {
    src: ['<%= folders.app %>/styles/**/*.less'],
    ignorePath: /client/g,
  }
};
