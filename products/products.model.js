const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  desc: {
    type: String,
    max: 100,
  },
});

module.exports = mongoose.model('product', productsSchema);
