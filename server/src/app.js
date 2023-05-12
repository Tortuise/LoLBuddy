// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;
app.use(express.static(path.join(__dirname, '/../../client/build')))


app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
  });