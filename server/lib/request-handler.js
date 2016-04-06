var request = require('request');
var User = require('../app/models/user');
var db = require('../app/dbsetup.js');



exports.allowCrossDomain = function(req, res, next) {
  console.log('sadasdasdasda');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};


exports.searchGames = function(req, res) {
  console.log(req.query.queryStr);
  var options = {
    url: 'http://www.giantbomb.com/api/search/?api_key=a31443da5c3e05c6800b06f298111a85b7d551cc&\
   format=json&query=' + req.query.queryStr + '&resources=game',
    headers: {
      'User-Agent': 'requestGameData'
    }
  };
  request(options, function (err, response, body) {
    if(err){
      throw err;
    } else {
      res.send(200, body);
    }
  });
};

exports.getUserString = function(req, res) {
  User.findOne({username: req.query.queryStr}).exec()
    .then(function(user) {
      res.send(200, user.gamesStr);
    });

};

exports.addNewUser = function(req, res) {
  
  var username = req.body.username;
  var password = req.body.password;
  
  User.findOne({ username: username }).exec()
    .then(function(user) {
      console.log(user);
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          gamesStr: ''
        });
        console.log(newUser)
        newUser.save(function(err, user) {
          res.send(200, {username: user.username, userstr: user.gamesStr});
        });

      } else {
        console.log('Account already exists');
        res.send(403);
      }
    });

};


exports.loginUser = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).exec()
    .then(function(user) {
      console.log(user);
      if (!user) {  
        res.send(403, 'User Not Found');
      } else {
        if(password === user.password) {
          res.send(200, user);
        } else {
          res.send(403, 'Invalid Credentials');
        }
      }
    });
  
};

exports.getGame = function(req, res) {
  console.log(req.query.gameId);
  var options = {
    url: 'http://www.giantbomb.com/api/game/' + req.query.gameId + '/?api_key=a31443da5c3e05c6800b06f298111a85b7d551cc&format=json',
    headers: {
      'User-Agent': 'requestGameData'
    }
  };
  console.log(options.url);
  request(options, function (err, response, body) {
    if(err){
      throw err;
    } else {
      res.send(200, body);
    }
  });
};

exports.updateUserStr = function(req, res) {
  console.log(req.body);
  User.update({ username: req.body.username },{gamesStr: req.body.gamesStr}, {}, function(){}).exec()
    .then(function(result) {
      // console.log(result);
      res.send(200, result);
    });

};

