const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();

const products = [];
for (let i = 0; i < 4; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    price: Math.round(faker.commerce.price()),
    desc: faker.commerce.productDescription(),
  });
}

app.get('/', (req, res) => {
  res.send('OK');
});

// [GET /products,  GET /products/:id, POST /products, UPDATE /products/:id, DELETE /products/:id] = CRUD (Create - Read - Update - Delete)

app.get('/products', (req, res) => {
  res.send(products);
});

// GET /products/:id ??????

app.get('/products/:id', (req, res) => {
  // id is here a route param
  const id = +req.params.id;

  // send back the corresponding product from our DB
  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct)
    return res.status(404).send({
      ok: false,
      message: 'Product not found',
    });

  res.send(foundProduct);
});

// DELETE /products/:id ???
app.delete('/products/:id', (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listenning on port ${port}`));
