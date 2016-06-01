'use strict';

angular.module('gaCampingStoreApp', [
                 'gaCampingStoreApp.auth',
                 'gaCampingStoreApp.admin',
                 'gaCampingStoreApp.constants',
                 'ngCookies',
                 'ngResource',
                 'ngSanitize',
                 'btford.socket-io',
                 'ui.router',
                 'ui.bootstrap',
                 'validation.match',
                 'ngAnimate'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
