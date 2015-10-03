(function () {
  'use strict';
  
  /* @ngInject */
  angular
    .module('app', ['ngRoute', 'ngMaterial', 'LocalStorageModule', 'app.controllers', 'app.services','uiGmapgoogle-maps'])
    .config(config).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);

  /* @ngInject */
  function config ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/map.tpl.html',
        controller: 'Map',
        controllerAs: 'map'
      })
      .when('/:postId', {
        templateUrl: 'views/post-detail.tpl.html',
        controller: 'PostDetailCtrl',
        controllerAs: 'postdetail'
      });
  }

})();
