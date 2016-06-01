'use strict';
(function(){

class ItemsComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('gaCampingStoreApp')
  .component('items', {
    templateUrl: 'app/items/items.html',
    controller: ItemsComponent
  });

})();
