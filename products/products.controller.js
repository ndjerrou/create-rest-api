const Product = require('./products.model');
const _ = require('underscore');

module.exports = {
  async fetchAllProducts(req, res) {
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
    try {
      const product = await Product.findById(req.params.id).exec();

      if (!product)
        return res.status(400).send({
          ok: false,
          msg: 'Product not found with the given id',
        });

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
  async updateProduct(req, res) {
    const { id } = req.params;
    console.log('ici');
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      }).exec();

      if (!updatedProduct)
        return res.status(400).send({
          ok: false,
          msg: 'Product not found with the given id',
        });

      res.send({
        ok: true,
        data: updatedProduct,
      });
    } catch (err) {
      return res.status(500).status({
        ok: false,
        msg: err,
      });
    }
  },
  async deleteProduct(req, res) {
    const id = req.params.id;

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct)
        return res.status(400).send({
          ok: false,
          msg: 'Product not found with the given id',
        });

      res.send({
        ok: true,
        data: deletedProduct,
      });
    } catch (err) {
      return res.status(500).status({
        ok: false,
        msg: err,
      });
    }
  },
};
