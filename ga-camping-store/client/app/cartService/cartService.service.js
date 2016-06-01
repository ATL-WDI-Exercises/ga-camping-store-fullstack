'use strict';

angular.module('gaCampingStoreApp')
  .service('cartService', function ($http, Auth) {

    var svc = this;

    svc.getCart = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.get('/api/users/' + userId + '/cart/');
    };

    svc.addItem = function(item) {
      var userId = Auth.getCurrentUser()._id;
      return $http.post('/api/users/' + userId + '/cart/' + item._id);
    };

    svc.removeItem = function(cartItem) {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/cart/' + cartItem._id);
    };

    svc.getCost = function(cartItem) {
      return cartItem.qty * cartItem.item.price;
    };

    svc.getTotal = function(cart) {
      var total = _.reduce(cart, function(sum, cartItem) {
        return sum + svc.getCost(cartItem);
      }, 0);
      console.log('total:', total);
      return total;
    };

    svc.clearCart = function() {
      var userId = Auth.getCurrentUser()._id;
      return $http.delete('/api/users/' + userId + '/cart/');
    };
  });
