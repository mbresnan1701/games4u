angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, $window, Games, Auth, User, init) {
  
  $scope.usergames = $window.localStorage.getItem('com.g4uUser').userGames;

  $scope.removeGame = function(game) {
    User.removeGame(game);
  }
});

