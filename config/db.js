  // db.js
  
  const mongoose = require('mongoose');
  require('dotenv').config();
  //const db = config.get('mongoURI');
  const db = process.env.mongoURI;
  
  const connectDB = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(db, {
        useNewUrlParser: true,
      });
  
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;