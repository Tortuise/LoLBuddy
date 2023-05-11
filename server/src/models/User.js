// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    email: {
        type: String
    },
    hobbies: {
      type: String
    },
    friends: {
        type: String
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }

  },{timestamps: true});
  
  module.exports = User = mongoose.model('user', UserSchema);