/**
 * @name <%= moduletype %>: <%= modulenameCamelized %>
 * @description <%= description %>
 * @author <%= author %>
 * @see {@link http://github.com/documentation|Specification}
 */
const <%= namespace %> = <%= namespace %> || {}; // get the apps namespace
<%= namespace %>.<%= modulenameAlwaysCamelized %> = (function () {
  'use strict';
  /**
   * @function privateFunctionExample
   * @description example private function
   * @param {string} name - The Name of who should be greeted.
   */
  function privateFunctionExample(name) {
    console.log('<%= moduletype %> "<%= modulenameCamelized %>" was loaded: Hello ' + name);
  }

  /**
   * @function publicFunctionExample
   * @description example public function - made public through the return statement
   */
  function publicFunctionExample(a, b) {
    return a + b;
  }

  /**
   * functions that should run at app-start
   * @constructor
   */
  privateFunctionExample('<%= author %>');

  return {
    // use the return statement to make variables and functions public
    publicFunctionExample
  };

}());

/** Example Usage:
  <%= namespace %>.<%= modulenameAlwaysCamelized %>.publicFunctionExample(1,5); // = 6
*/
