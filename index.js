var fs = require('fs');
var path = require('path');

var defaultTemplate = path.resolve(__dirname, 'template.html');

function render(files, dirList) {
    return files.map(function (file) {
      // relative
      var relPath = dirList.concat(file);
      // absolute
      var absPath = ['./'].concat(relPath);
      var isDir = fs.statSync(path.resolve.apply(null, absPath)).isDirectory();

      if (isDir) {
        var contents = fs.readdirSync(path.resolve.apply(null, absPath));
        var childRelPath;
        for (var i = 0; i < contents.length; i++) {
          childRelPath = relPath.concat(contents[i]);
          var childAbsPath = absPath.concat(contents[i]);
          var stats = fs.statSync(path.resolve.apply(null, childAbsPath));
          if (stats.isFile()) {
            joined = childRelPath.join('/');
            return '<img data-href="/' + relPath.join('/') + '" data-thumb="/' +
            joined + '" data-src="/' + joined + '" data-name="' + file + '" data-description="' + file + '"/>';
          }
        }
      } else {
        var joined = relPath.join('/');
        return '<img data-thumb="/' + joined + '" data-src="/' + joined + '" data-name="' + file + '" data-description="' + file + '" />';
      }
    }).join('');
}

module.exports = function (templateFile) {
  templateFile = templateFile || defaultTemplate;
  return function (req, res, next) {
    var relPath = req.path.split('/').slice(1);
    var absPath = ['./'].concat(relPath);
    var isDir = fs.statSync(path.resolve.apply(null, absPath)).isDirectory();
    if (isDir) {
      var files = fs.readdirSync(path.resolve.apply(null, absPath));
      fs.readFile(templateFile, 'utf8', function (err,html) {
        html = html.replace('<% images %>', render(files, relPath));
        res.send(html);
      });
    } else {
      res.sendFile(path.resolve.apply(null, absPath));
    }
  }
};
