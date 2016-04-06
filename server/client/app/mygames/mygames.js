angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, $window, Games, Auth, User, init) {
  
  $scope.usergames = init;
  // $scope.usergames = JSON.parse($window.localStorage.getItem('com.g4uUser')).userGames;

  $scope.removeGame = function(game) {
    var tokenData = JSON.parse($window.localStorage.getItem('com.g4uUser'));
    var idregex = /(\d*-\d*)/g;
    var gameId = game.api_detail_url.match(idregex)[0];
    var gameStrRegex = new RegExp('\\?'+gameId);
    tokenData.gamesStr = tokenData.gamesStr.replace(gameStrRegex, '');
    User.removeGame(game);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/updatestr',
      data: JSON.stringify({username: tokenData.username, gamesStr: tokenData.gamesStr}),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
        console.log(data);
        
    }).error(function(data){
      console.log('!!!!!!!!!!!');
    });
    var regex = /(\d*-\d*)/g;
    var gameId = game.api_detail_url.match(regex)[0];
    var gameindex;
    for(var i = 0; i < $scope.usergames.length; i++) {
      if($scope.usergames[i].api_detail_url === 
"http://www.giantbomb.com/api/game/" + gameId + "/") {
        gameindex = i;
        break;
      }
    }
    $scope.usergames.splice(gameindex, 1);
    console.log($scope.usergames);
}



});

// var token = JSON.parse($window.localStorage.getItem('com.g4uUser'));
// token.userGames.push(data);
// $window.localStorage.setItem('com.g4uUser', JSON.stringify(token));