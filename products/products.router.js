const express = require('express');

const validatePayload = require('../middlewares/validatePayload');
const {
  fetchAllProducts,
  addProduct,
  fetchSingleProduct,
  updateProduct,
  deleteProduct,
} = require('./products.controller');

const router = express.Router();

router.route('/').get(fetchAllProducts).post(validatePayload, addProduct);

router
  .route('/:id')
  .get(fetchSingleProduct)
  .put(validatePayload, updateProduct)
  .delete(deleteProduct);

module.exports = router;
