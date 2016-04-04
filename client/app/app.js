angular.module('g4u', [
  'g4u.services',
  'g4u.games',
  'g4u.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/mygames', {
    templateUrl: 'app/games/mygames.html',
    controller: 'GamesCtrl'

  });


  // $httpProvider.interceptors.push('AttachTokens');
});
// .factory('AttachTokens', function ($window) {

//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {

//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
