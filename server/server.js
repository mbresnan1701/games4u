var express = require('express');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  // app.use(express.bodyParser());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  
  app.use(express.static(__dirname + '/client'));
});



// app.all('*', function (request, response, next) {
//   console.log('mid called');
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE", "OPTIONS");
//   next();
// });

app.get('/findgames', handler.searchGames);
// app.get('/create', util.checkUser, handler.renderIndex);

module.exports = app;

var port = 1337;

app.listen(port);

console.log('Server now listening on port ' + port);
