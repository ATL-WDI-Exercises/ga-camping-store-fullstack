'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get   ('/:userid/cart/',        controller.get);
router.post  ('/:userid/cart/:itemid', controller.addItem);
router.delete('/:userid/cart/:itemid', controller.removeItem);
router.delete('/:userid/cart/',        controller.removeAllItems);

module.exports = router;
