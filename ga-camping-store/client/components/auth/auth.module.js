'use strict';

angular.module('gaCampingStoreApp.auth', ['gaCampingStoreApp.constants', 'gaCampingStoreApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
