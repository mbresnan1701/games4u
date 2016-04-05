angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, $window, Games, Auth, User, init) {
  
  $scope.usergames = JSON.parse($window.localStorage.getItem('com.g4uUser')).userGames;

  $scope.removeGame = function(game) {
    var tokenData = JSON.parse($window.localStorage.getItem('com.g4uUser'));
    User.removeGame(game);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/updatestr',
      data: JSON.stringify({username: tokenData.username, gamesStr: tokenData.gamesStr}),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
      console.log(data);
        $scope.usergames = JSON.parse($window.localStorage.getItem('com.g4uUser')).userGames;
        $location.path('/mygames');
    });
  }
});

// var token = JSON.parse($window.localStorage.getItem('com.g4uUser'));
// token.userGames.push(data);
// $window.localStorage.setItem('com.g4uUser', JSON.stringify(token));