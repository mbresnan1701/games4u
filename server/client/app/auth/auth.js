angular.module('g4u.auth', [])

.controller('AuthCtrl', function ($scope, $http, $window, $location, Auth) {
  $scope.user = {};
  
  $scope.signin = function () {

  };
  $scope.signout = function() {
  
  };

  $scope.signup = function () {
    console.log($scope.user);
    $http({
          method: 'POST',
          url: 'http://127.0.0.1:1337/users/adduser',
          data: JSON.stringify($scope.user),
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
  };

});
