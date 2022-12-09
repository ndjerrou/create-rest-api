const express = require('express');
const Joi = require('joi');
const { faker } = require('@faker-js/faker');

const validatePayload = require('../middlewares/validatePayload');

const router = express.Router();

const products = [];
for (let i = 0; i < 4; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    price: Math.round(faker.commerce.price()),
    desc: faker.commerce.productDescription(),
  });
}

router
  .route('/')
  .get((req, res) => {
    res.send(products);
  })
  .post(validatePayload, (req, res) => {
    const { name, price, desc } = req.body;

    const product = {
      id: products.length + 1,
      name,
      price,
      desc,
    };

    products.push(product);

    res.status(201).send({
      ok: true,
      data: product,
    });
  });

router
  .route('/:id')
  .get(fetchSingleProduct)
  .put(validatePayload, (req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id === +id);

    if (!product)
      return res.status(400).send({
        ok: false,
        message: 'Product not found with the given id',
      });

    for (let key in req.body) {
      product[key] = req.body[key];
    }

    res.send({ ok: true, data: product });
  })
  .delete((req, res) => {
    const id = +req.params.id;

    const idx = products.findIndex((product) => product.id === id);

    console.log(idx);

    if (idx < 0)
      return res.status(404).send({
        ok: false,
        message: 'Product not found with the given ID',
      });

    const [deletedProduct] = products.splice(idx, 1);

    res.send({
      ok: true,
      data: deletedProduct,
    });
  });

module.exports = router;
