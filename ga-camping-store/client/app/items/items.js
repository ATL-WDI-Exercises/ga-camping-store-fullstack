'use strict';

angular.module('gaCampingStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        url: '/items',
        template: '<items></items>'
      });
  });
