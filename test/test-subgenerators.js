'use strict';

var testhelper = require('../testhelper.js');


var optionsA = {
  cssPreprocessor: 'less',
  galen: false,
  karma: false,
  camelized: false
};

var optionsB = {
  cssPreprocessor: 'sass',
  galen: true,
  karma: true,
  camelized: true
};

var testrunnerA = testhelper(optionsA);
var testrunnerB = testhelper(optionsB);

testrunnerA('atom');
testrunnerB('atom');

testrunnerA('molecule');
testrunnerB('molecule');

testrunnerA('organism');
testrunnerB('organism');

testrunnerA('template');
testrunnerB('template');

testrunnerA('page');
testrunnerB('page');
