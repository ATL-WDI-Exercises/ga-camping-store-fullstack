'use strict';

import mongoose from 'mongoose';

var CartItemSchema = new mongoose.Schema({
  item : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  qty : Number
});

export default mongoose.model('CartItem', CartItemSchema);
