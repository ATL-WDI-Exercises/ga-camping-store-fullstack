'use strict';

describe('Filter: itemFilter', function () {

  // load the filter's module
  beforeEach(module('gaCampingStoreApp'));

  // initialize a new instance of the filter before each test
  var itemFilter;
  beforeEach(inject(function ($filter) {
    itemFilter = $filter('itemFilter');
  }));

  it('should return the input prefixed with "itemFilter filter:"', function () {
    var text = 'angularjs';
    expect(itemFilter(text)).to.equal('itemFilter filter: ' + text);
  });

});
