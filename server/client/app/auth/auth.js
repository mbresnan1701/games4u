angular.module('g4u.auth', [])

.controller('AuthCtrl', function ($scope, $http, $window, $location, Auth) {
  $scope.user = {};
  
  $scope.signin = function () {
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/loginuser',
      data: JSON.stringify($scope.user),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
        $window.localStorage.setItem('com.g4uUser', {user: data});
        $location.path('/mygames');
    });
    
  };

  $scope.isAuth = function() {
    return Auth.isAuth();
  };

  $scope.signout = function() {
    $window.localStorage.removeItem('com.g4uUser');
    $location.path('/signin');
  };

  $scope.signup = function () {
    $http({
          method: 'POST',
          url: 'http://127.0.0.1:1337/users/adduser',
          data: JSON.stringify($scope.user),
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).success(function(data){
            $window.localStorage.setItem('com.g4uUser', {user: data.username, gamesStr: data.gamesStr, userGames: []});
            $location.path('/mygames');
        })
  };
  

});
