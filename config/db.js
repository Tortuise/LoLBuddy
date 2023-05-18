  // db.js
  
  const mongoose = require('mongoose');
  const config = require('config');
  require('dotenv').config();
  console.log("test "+process.env.NODE_ENV)
  const db = config.get('mongoURI')
  
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