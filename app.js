require('dotenv').config()
const express = require('express');
const app = express();
const index = require('./Routes/indexRouter');
const products = require('./Routes/productsRouter');
const bodyParser = require('body-parser');

const backdoor = require('./Routes/backdoorRouter');

//Database
const { Client } = require('pg')
const client = new Client()

app.use(bodyParser.json());
app.use('/', index);
app.use('/products', products);
app.use('/backdoor', backdoor)

app.listen(process.env.NODE_PORT, () => {
    console.log("Server running on port " + process.env.NODE_PORT)
})