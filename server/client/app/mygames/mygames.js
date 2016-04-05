angular.module('g4u.mygames', [])

.controller('MyGamesCtrl', function ($scope, $http, Games, User, Auth) {
  $scope.userGamesStr = '';
  $scope.userGames = [];
  $scope.user = 'Batman';

  $scope.getUserGames = function(query) {
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:1337/user',
      params: {user: $scope.user}
    }).success(function(data) {
      console.log(data);

      //DO THING WITH STR HERE
    }).catch(function(err) {
      return err;
    });
  };

})
  .factory('User', function() {
    var user = {};
    user.games = [];

    user.addGame = function(game) {
      user.games.push(game);
    };

    return user;
});

