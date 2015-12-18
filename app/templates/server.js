var path = require('path');
var fs = require('fs');
var url = require('url');
var express = require('express');
var glob = require('glob');
var yaml = require('js-yaml');
var jade = require('jade');

var app = express();

var contents = getContents();

app.use(require('connect-livereload')({
    port: 35729
  }));

/**
 * middleware to handle template requests
 */
app.use(function(req, res, next) {
  var _filepath = getTemplatePath(req.originalUrl);

  if (!_filepath) {
    return next();
  }

  fs.stat(_filepath, function(err, stats) {
    if (err) {
      return next(err);
    }

    if (!stats.isFile()) {
      return next(err);
    }

    // prepare global jade path variables
    var level = req.originalUrl.match(/\//g).length - 1;
    var path = '../'.repeat(level);

    var contents = {};
    // get all yaml-file-paths
    glob('app/**/*.yaml', function(err, files) {
      var _fileCount = files.length;
      files.forEach(function(filepath) {
        // generate namespace
        var _namespace = filepath.substr(filepath.lastIndexOf('/') + 1);
        _namespace = _namespace.replace('.yaml', '').toLowerCase();
        // load the yaml file
        fs.readFile(filepath, function(err, data) {
          _fileCount--;
          // parse yaml
          contents[_namespace] = yaml.load(data);

          // if all files are parsed, render template
          if (_fileCount <= 0) {
            jade.renderFile(_filepath, {
                pretty: true,
                basedir: __dirname + '/app',
                level: level,
                path: path,
                yaml: contents,
                timestamp: 'just now :)',
                dev: true
              }, function renderfile(err, html) {
                if (err) {
                  return next(err);
                }

                res.setHeader('Content-Length', Buffer.byteLength(html));
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                return res.end(html);
            });
          }
        });
      });
    });
  });
});

var staticFolders = ['/.tmp', '/app', '/bower_components'];

staticFolders.forEach(function(folder) {
  app.use(express.static(__dirname + folder));
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});

function getContents() {
  var contents = {};
  glob('app/**/*.yaml', function(err, files) {
    files.forEach(function(filepath) {
      var _namespace = filepath.substr(filepath.lastIndexOf('/') + 1);
      _namespace = _namespace.replace('.yaml', '').toLowerCase();
      contents[_namespace] = yaml.load(fs.readFileSync(filepath));
    });
  });

  return contents;
}

function getTemplatePath(requestUrl) {
  var _extenstions = ['.html', '.htm', '.jade'];
  var _parsed = url.parse(requestUrl);
  var _pathname = _parsed.pathname.replace(__dirname + '/app', '');
  var _requestedExt = path.extname(_pathname);
  var _pathnameWithoutExt = _pathname.substr(0, _pathname.length - _requestedExt.length);

  // get index file for directory requests
  if (_requestedExt === '') {
    if (_pathname.substr(-1) !== '/') {
      _pathnameWithoutExt += '/';
    }
    _pathnameWithoutExt += 'index';
    _requestedExt = _extenstions[0];
  }

  // check if requested extension is allowed
  if (_extenstions.indexOf(_requestedExt) === -1) {
    return null;
  }

  // find the template and return the path
  var _ext = '.jade';
  var _filepath = path.join(__dirname + '/app', _pathnameWithoutExt + _ext);
  if (fs.existsSync(_filepath)) {
    return _filepath;
  }

  return null;
}
