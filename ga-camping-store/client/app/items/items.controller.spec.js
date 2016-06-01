'use strict';

describe('Component: ItemsComponent', function () {

  // load the controller's module
  beforeEach(module('gaCampingStoreApp'));

  var ItemsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ItemsComponent = $componentController('ItemsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
