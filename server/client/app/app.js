angular.module('g4u', [
  'g4u.services',
  'g4u.games',
  'g4u.auth',
  'g4u.mygames',
  'ngRoute', 
  'ngCookies'
])
.config(function ($routeProvider, $httpProvider) {

  $routeProvider
  .when('/mygames', {
    templateUrl: 'app/mygames/mygames.html',
    controller: 'MyGamesCtrl',
    authenticate: true,
    resolve: {
      init: function(User) {
        return User.getUserGames();
      }
    }

  })

  .when('/findgames', {
    templateUrl: 'app/games/games.html',
    controller: 'GamesCtrl'
  })

  .when('/signin', {
    templateUrl: 'app/auth/loadsavedgame.html',
    controller: 'AuthCtrl'
  })

  .when('/signup', {
    templateUrl: 'app/auth/newgame.html',
    controller: 'AuthCtrl'
  });

})

.run(function ($rootScope, $location, Auth) {

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
