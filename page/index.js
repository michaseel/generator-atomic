'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var helper = require('../helper.js')('page');
var Generator = module.exports = helper.Generator;
util.inherits(Generator, yeoman.generators.Base);
Generator.prototype.promptConfig = helper.promptConfig;
Generator.prototype.sourceFiles = helper.sourceFiles;
Generator.prototype.install = helper.install;
