var express = require('express');
var util = require('./lib/utility');
var bodyParser = require('body-parser');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  
  app.use(express.static(__dirname + '/client'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});


app.get('/findgames', handler.searchGames);

app.post('/users/adduser', handler.addNewUser);
// app.post('/user')
// app.get('/create', util.checkUser, handler.renderIndex);

module.exports = app;

var port = 1337;

app.listen(port);

console.log('Server now listening on port ' + port);
