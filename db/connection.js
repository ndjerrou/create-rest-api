const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);

    console.log('Successfully connected on MongoDb ATLAS');
  } catch (err) {
    console.log(err);

    throw new Error(err);
  }
};
