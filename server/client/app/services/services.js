angular.module('g4u.services', [])

.factory('Games', function ($http) {

  var searchGames = function(query) {

    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:1337/findgames',
      data: query
    });
  };

  return {
    searchGames: searchGames
  };
  
})
.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/signin',
      data: user
    })
  };

  var adduser = function (user) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/adduser',
      data: user
    });

  };
  
  var isAuth = function() {
    return $window.localStorage.getItem('com.g4uUser') !== null;
  };

  var signout = function() {
    return $window.localStorage.removeItem('com.g4uUser');
  }

  return {
    signin: signin,
    adduser: adduser,
    isAuth: isAuth,
    signout: signout

  };
})
.factory('User', function($http, $location, $window) {

  var user = {};
  user.getUserGames = function(query) {
    var oldToken = $window.localStorage.getItem('com.g4uUser');
    var userGameStrArr = oldToken.gamesStr.split('?');

    for(var i = 0; i < userGameStrArr.length; i++) {

      $http({
        method: 'GET',
        url: 'http://127.0.0.1:1337/game',
        params: {user: $window.localStorage.getItem('com.g4uUser').username}
      }).success(function(data) {
        console.log(data);
        oldToken.userGames.push(data)
      }).catch(function(err) {
        return err;
      });
    }

    $window.localStorage.setItem('com.g4uUser', oldToken);

  };

  user.AddUserGame = function(game) {
    var oldToken = $window.localStorage.getItem('com.g4uUser');

    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    oldToken.gamesStr += '?' + game.id;
    oldToken.userGames.push(game)
    $window.localStorage.setItem('com.g4uUser', oldToken);
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    
  };
  
  user.removeGame = function(game) {
    var oldToken = $window.localStorage.getItem('com.g4uUser');
    var regex ='/\?' + game.id + '/gi';
    oldToken.gamesStr.replace(regex, '');
    oldToken.userGames.splice(oldToken.userGames.indexOf(game), 1);
    $window.localStorage.setItem('com.g4uUser', oldToken);

  };






  return user;

});








