const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const staticDir = path.join(__dirname, 'dist');

const server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var pathname = path.join(staticDir, parsedUrl.pathname);
  fs.stat(pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404;
      res.end("File " + pathname + " not found!");
      return;
    }
    if (stats.isDirectory()) {
      pathname = path.join(pathname, 'index.html');
    }
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end("Error getting the file.");
      } else {
        var ext = path.parse(pathname).ext;
        var mimeType = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.json': 'application/json'
        }[ext] || 'application/octet-stream';
        res.setHeader("Content-Type", mimeType);
        res.end(data);
      }
    });
  });
});

var PORT = process.env.PORT || 3080;
server.listen(PORT, '0.0.0.0', function () {
  console.log("Server is running on port " + PORT);
});
