const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log('Successfully connected on MongoDb ATLAS');

    const productSchema = mongoose.Schema({
      name: String,
      price: Number,
    });

    const Product = mongoose.model('product', productSchema); // a collection

    // const product = new Product({
    //   // a document
    //   name: 'Mon premier product en DB',
    //   price: 1000,
    // });

    // await product.save(); // I/O

    // reading the Product collection...
    const products = await Product.find().exec();
    console.log('Inside my collection PRODUCTS...');

    // Update a product

    // const product = await Product.findById('6390d4cd305e92ad2c77af40').exec();
    // product.price = 200;

    // console.log(product);

    // product.save();

    // const updatedProduct = await Product.findByIdAndUpdate(
    //   '6390d4cd305e92ad2c77af40',
    //   {
    //     $set: { price: 300 },
    //   }
    // );

    // console.log(updatedProduct);

    // Delete a product
    await Product.findOneAndDelete({ id: '6390d4cd305e92ad2c77af40' });

    // console.log(products);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
