var express = require('express');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session());
});

app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);


module.exports = app;

var port = 1337;

app.listen(port);

console.log('Server now listening on port ' + port);
