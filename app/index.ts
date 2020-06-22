import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { productRouter } from './routers/product-router';
import { userRouter } from './routers/user-router';
import { paymentRouter } from './routers/payment-router';
import { portfolioRouter } from './routers/portfolio-router';
import { orderRouter } from './routers/order-router';


dotenv.config();
const app = express();
const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE;
const uri = process.env.MONGO_DB_URI;
const connString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-mwra4.azure.mongodb.net/${database}?retryWrites=true&w=majority`
const path = require('path');
mongoose.connect(uri || connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(error => console.log(error));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // allow preflight
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use('/api/payments', paymentRouter);

app.use('/api/portfolio', portfolioRouter);

app.use('/api/orders', orderRouter);

const port = process.env.PORT || 9080;
app.listen(port, () => {
  console.log('started at http://localhost:', port);
})