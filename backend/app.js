const express = require('express');

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

//****************Route imports********************

//product
const product = require('./routes/productRoute');
app.use('/api',product);

//Middleware for errors
app.use(errorMiddleware);




module.exports = app;