'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cartCtrlStub = {
  index: 'cartCtrl.index',
  show: 'cartCtrl.show',
  create: 'cartCtrl.create',
  update: 'cartCtrl.update',
  destroy: 'cartCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cartIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cart.controller': cartCtrlStub
});

describe('Cart API Router:', function() {

  it('should return an express router instance', function() {
    expect(cartIndex).to.equal(routerStub);
  });

  describe('GET /api/users/:userId/cart', function() {

    it('should route to cart.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cartCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users/:userId/cart/:id', function() {

    it('should route to cart.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cartCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users/:userId/cart', function() {

    it('should route to cart.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cartCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:userId/cart/:id', function() {

    it('should route to cart.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cartCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/users/:userId/cart/:id', function() {

    it('should route to cart.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cartCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users/:userId/cart/:id', function() {

    it('should route to cart.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cartCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
