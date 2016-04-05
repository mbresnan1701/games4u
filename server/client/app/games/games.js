angular.module('g4u.games', [])

.controller('GamesCtrl', function ($scope, $http, Games, User) {

  $scope.results = [];

  $scope.findGames = function(query) {
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:1337/findgames',
      params: {queryStr: query}
    }).success(function(data) {
      $scope.results = data;
      console.log($scope.results);
    }).catch(function(err) {
      return err;
    });
  };

  $scope.addUserGame = function(game) {
    User.addGame(game);

  };

});
