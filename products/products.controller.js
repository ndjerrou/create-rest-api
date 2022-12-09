const Product = require('./products.model');
const _ = require('underscore');

module.exports = {
  async fetchProducts(req, res) {
    try {
      const products = await Product.find();
      res.send({
        ok: true,
        data: products,
      });
    } catch (err) {
      res.status(500).send({
        ok: false,
        msg: "Can't fetch products. Please try later",
      });
    }
  },
  async fetchSingleProduct(req, res) {
    // products/:id
    // findById ==> mongoose
    try {
      const product = await Product.findById(req.params.id).exec();

      // @TODO : check if product is not found, if id is incorrect

      res.send({ ok: true, data: _.pick(product, ['name', 'price', 'desc']) });
    } catch (err) {
      res.status(500).send({
        ok: false,
        msg: "Can't fetch a product with the given id. Please try again",
        err,
      });
    }
  },
  async addProduct(req, res) {
    const { name, price, desc } = req.body;

    const product = new Product({
      name,
      price,
      desc,
    });

    try {
      await product.save();

      res.status(201).send({
        ok: true,
        data: product,
      });
    } catch (err) {
      res.status(500).send({
        ok: false,
        msg: err,
      });
    }
  },
};
