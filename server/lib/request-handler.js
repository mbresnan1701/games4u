var request = require('request');
var User = require('../app/models/user');
var db = require('../app/dbsetup.js');



exports.allowCrossDomain = function(req, res, next) {
  console.log('sadasdasdasda');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
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

exports.getUserString = function(user) {

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
          password: password
        });
        console.log(newUser)
        newUser.save(function(err, user) {
          // util.createSession(req, res, user.username);
          res.send(200, user);
        });

      } else {
        console.log('Account already exists');
        res.send(403);
      }
    });


};
