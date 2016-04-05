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
});








