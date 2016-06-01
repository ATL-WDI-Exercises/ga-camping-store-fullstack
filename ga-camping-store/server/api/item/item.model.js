'use strict';

import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
  name:        String,
  category:    String,
  price:       { type: Number, min: 0, max: 9999.99 },
  qty:         { type: Number, min: 0, max: 999 },
  rating:      { type: Number, min: 0, max: 5.0 },
  description: String,
  imageFile:   String
});

export default mongoose.model('Item', ItemSchema);
