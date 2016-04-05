angular.module('g4u.games', [])

.controller('GamesCtrl', function ($scope, $http, Games) {
  // Your code here
  $scope.results = [];
  $scope.userGames = [];

  $scope.findGames = function(query) {
    // Games.searchGames(query).then(function(response){
    //   console.log('getting results');
    //   $scope.data = response;
    //   console.log($scope.data);
    // });
    console.log(query);
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

});
