const express = require('express');

const productsRouter = require('./products/products.router');
const connectionDB = require('./db/connection');
require('dotenv').config();

connectionDB();
init();

function init() {
  const app = express();

  app.use(express.json());
  app.use('/api/products', productsRouter);

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listenning on port ${port}`));
}
