const Product = require('./products.model');

module.exports = {
  async fetchProducts(req, res) {
    try {
      const products = await Product.find();
      res.send({
        ok: true,
        data: products,
      });
    } catch (err) {
      res.status(500).send("Can't fetch products. Please try later");
    }
  },
};
