angular.module('g4u.games', [])

.controller('GamesCtrl', function ($scope, $http, Games, Auth, User) {

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
    User.AddUserGame(game);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:1337/users/loginuser',
      data: JSON.stringify($scope.user),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).success(function(data){
        $window.localStorage.setItem('com.g4uUser', {user: data});
        $location.path('/mygames');
    });

    
  };

});
