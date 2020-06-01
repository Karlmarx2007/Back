import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { productRouter } from './routers/product-router';
import { userRouter } from './routers/user-router';

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

app.use(bodyParser.json());

app.use('/api/products', productRouter);

app.use('/api/users', userRouter)

const port = process.env.PORT || 9080;
app.listen(port, () => {
  console.log('started at http://localhost:', port);
})