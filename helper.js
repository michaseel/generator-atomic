'use strict';
var s = require("underscore.string");
var yeoman = require('yeoman-generator');

module.exports = function(moduletype) {

  var moduleconfig;

  var Generator = function(args, options) {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('modulename', { type: String, required: false });
    this.argument('description', { type: String, required: false });
    this.pkg = require('./package.json');
  };

  var prompts = [
    {
      name: 'modulename',
      message: 'Name this ' + moduletype
    },
    {
      name: 'description',
      message: 'Describe this ' + moduletype
    },
    {
      name: 'author',
      message: 'Whats your name? (the author)',
      store: true
    }
  ];

  var promptConfig = function() {


    var cb = this.async(),
      welcomeMsg = 'generator-atomic:' + moduletype + ' version: ' + this.pkg.version;

    console.log(welcomeMsg);

    if(this.modulename) {
      prompts = [];
    }

    this.prompt(prompts, function(props) {

      moduleconfig = this.config.get(moduletype);

      this.moduletype = moduletype;

      this.modulename = props.modulename || this.modulename;
      this.modulename = s(this.modulename).trim().slugify().value();

      this.author = props.author || 'empty';
      this.description = props.description || this.description || moduletype + ' description here';

      this.appname   = this.config.get('appname');
      this.projectName = this.config.get('projectName');
      this.namespace = this.config.get('namespace');
      this.cssPreprocessor = this.config.get('cssPreprocessor') || 'less';
      this.cssPreprocessorExtension = this.config.get('cssPreprocessorExtension') || 'less';

      this.galen = this.config.get('galen');
      this.karma = this.config.get('karma');
      this.camelized = this.config.get('camelized');

      this.modulenameAlwaysCamelized = s.camelize(this.modulename);
      this.modulenameCamelized = (this.camelized) ? this.modulenameAlwaysCamelized : this.modulename;

      cb();
    }.bind(this));
  };

  var sourceFiles = function() {
    var srcpath = '../../templates/';
    var destpath = 'app/' + moduleconfig.modulefolder + '/' + this.modulenameCamelized;

    this.copy(srcpath + 'module.jade', destpath + '/' + this.modulenameCamelized + '.jade');

    if (moduleconfig.markupmixins) {
      this.copy(srcpath + '_module.jade', destpath + '/_' + this.modulenameCamelized + '.jade');
    }
    if (moduleconfig.content) {
      this.copy(srcpath + 'module.yaml', destpath + '/' + this.modulenameAlwaysCamelized + '.yaml');
    }
    if (moduleconfig.styles) {
      this.copy(srcpath + 'module.' + this.cssPreprocessorExtension, destpath + '/' + this.modulenameCamelized + '.' + this.cssPreprocessorExtension);
    }
    if (moduleconfig.scripts) {
      this.copy(srcpath + 'module.js', destpath + '/' + this.modulenameCamelized + '.js');
    }
    if (this.karma && moduleconfig.scripts) {
      this.copy(srcpath + 'module.unit.js', destpath + '/' + this.modulenameCamelized + '.unit.js');
    }
    if (this.galen) {
      this.copy(srcpath + 'module.spec', destpath + '/' + this.modulenameCamelized + '.spec');
    }
  };


  var install = function() {
    if (this.options['skip-install']) {
      return;
    }
    // this.spawnCommand('grunt', ['injector']);
  };

  return {
    Generator: Generator,
    promptConfig: promptConfig,
    sourceFiles: sourceFiles,
    install: install
  };
};
