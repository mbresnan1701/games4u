angular.module('g4u.services', [])

.factory('Games', function ($http) {

  var searchGames = function(query) {
    console.log(query);
    // return $http({
    //   method: 'GET',
    //   url: 'http://www.giantbomb.com/api/search/?api_key=a31443da5c3e05c6800b06f298111a85b7d551cc& \
    //   format=json&query="warcraft"&resources=game' 
    // });

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
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    console.log('SIGNOUT CALLED');
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});








