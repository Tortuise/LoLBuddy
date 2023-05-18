// app.js

const express = require('express');
const connectDB = require('../../config/db');
const cors = require('cors');
require('dotenv').config();

// routes
const users = require('./routes/api/users');


const app = express();

connectDB();

// cors
app.use(cors());

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));

console.log("process " + process.env.NODE_ENV)
console.log("test " + process.env.REACT_APP_TEST)
// use Routes
app.use('/api/users', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
