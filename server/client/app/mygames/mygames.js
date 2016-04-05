angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, $window, Games, Auth, User, init) {
  
  $scope.usergames = JSON.parse($window.localStorage.getItem('com.g4uUser')).userGames;

  $scope.removeGame = function(game) {
    User.removeGame(game);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/updatestr',
      data: JSON.stringify($window.localStorage.getItem('com.g4uUser').gamesStr),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
        var token = JSON.parse($window.localStorage.getItem('com.g4uUser'));
        token.userGames.push(data);
        $window.localStorage.setItem('com.g4uUser', JSON.stringify(token));
        $location.path('/mygames');
    });
  }
});

