angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, $window, Games, Auth, User, init) {
  
  $scope.usergames = $window.localStorage.getItem('com.g4uUser').userGames;

  $scope.removeGame = function(game) {
    User.removeGame(game);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/updatestr',
      data: JSON.stringify($window.localStorage.getItem('com.g4uUser').gamesStr),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
        $location.path('/mygames');
    });
  }
});

