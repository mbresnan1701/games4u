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
    if(JSON.parse($window.localStorage.getItem('com.g4uUser')).gamesStr){

      var oldToken = JSON.parse($window.localStorage.getItem('com.g4uUser'));
      var userGameStrArr = oldToken.gamesStr.split('?');
      console.log(userGameStrArr);

      for(var i = 0; i < userGameStrArr.length; i++) {
        if (userGameStrArr[i] !== '') {
          $http({
            method: 'GET',
            url: 'http://127.0.0.1:1337/game',
            params: {gameId: userGameStrArr[i]}
          }).success(function(data) {
            console.log(data);
            oldToken.userGames.push(data.results)
          }).catch(function(err) {
            return err;
          });
        }
      }

      $window.localStorage.setItem('com.g4uUser', JSON.stringify(oldToken));
    }

  };

  user.AddUserGame = function(game) {
    var oldToken = JSON.parse($window.localStorage.getItem('com.g4uUser'));
    
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    var regex = /(\d*-\d*)/g;
    var gameId = game.api_detail_url.match(regex)[0];
    console.log(gameId);
    oldToken.gamesStr += '?' + gameId;
    oldToken.userGames.push(game)
    $window.localStorage.setItem('com.g4uUser', JSON.stringify(oldToken));
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    
  };
  
  user.removeGame = function(game) {
    var oldToken = JSON.parse($window.localStorage.getItem('com.g4uUser'));
    var regex = /(\d*-\d*)/g;
    var gameId = game.api_detail_url.match(regex)[0];
    var gameStrRegex ='/\?' + gameId + '/gi';
    oldToken.gamesStr.replace(gameStrRegex, '');
    oldToken.userGames.splice(oldToken.userGames.indexOf(game), 1);
    $window.localStorage.setItem('com.g4uUser', JSON.stringify(oldToken));

  };


  return user;

});








