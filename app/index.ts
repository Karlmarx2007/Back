import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { productRouter } from './routers/product-router';
import { userRouter } from './routers/user-router';
import { paymentRouter } from './routers/payment-router';
import { portfolioRouter } from './routers/portfolio-router';


dotenv.config();
const app = express();
const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE;
const connString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-mwra4.azure.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(error => console.log(error));

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'front/build')));

app.use(bodyParser.json());

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use('/api/payments', paymentRouter);

app.use('/api/portfolio', portfolioRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/front/build/index.html'))
// })
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('front/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 9080;
app.listen(port, () => {
  console.log('started at http://localhost:', port);
})