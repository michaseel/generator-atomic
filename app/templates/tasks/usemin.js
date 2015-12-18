/**
 * grunt-usemin options
 * @type {Object}
 */

module.exports = {
  html: ['<%- folders.dist %>/{,*/,**/}*.html'],
  css: ['<%- folders.dist %>/{,*/,**/}*.css'],
  options: {
    dirs: ['<%- folders.dist %>'] /*,
    blockReplacements: { // use this to async load js and css
      js: function (block){
        console.log(block.dest);
        return '<script>loadJS("' + block.dest + '");<\/script>';
      },
      css: function (block){
        console.log(block.dest);
        return '<script>loadCSS("' + block.dest + '");<\/script>';
      }
    }*/
  }
};
