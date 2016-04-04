angular.module('g4u.games', [])

.controller('GamesCtrl', function ($scope, $http, Games) {
  // Your code here
  $scope.results = [];

  $scope.findGames = function(query) {
    $scope.results = Games.searchGames(query);
  };

});
