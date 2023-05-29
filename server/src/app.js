// app.js

const express = require('express');
const connectDB = require('../../config/db');
const cors = require('cors');
require('dotenv').config();

// routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const friends = require('./routes/api/friends');
const followers = require('./routes/api/followers');

const app = express();

connectDB();

// cors
app.use(cors());

// Init Middleware
app.use(express.json());


// use Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/friends', friends)
app.use('/api/followers', followers)

console.log("test "+process.env.NODE_ENV)
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
