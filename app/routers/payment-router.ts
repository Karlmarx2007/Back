import { Router } from 'express';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../models/product';

export const paymentRouter = Router();

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

const calculateTotal = (products: IProduct[]): number => {
  return products.reduce((acc, current) => acc + current.price, 0);
}


paymentRouter.post('/payment', async (req, res) => {
  const { products, token } = req.body;
  products.forEach((p: IProduct) => console.log(p.price));
  const idempotencyKey = uuidv4();

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id
  });

  if (!customer) {
    res.status(500).send({ msg: 'Failed to create customer' });
  }

  try {
    const charge = await stripe.charges.create({
      /*Math.round solves the floating point error in Javascript */
      amount: Math.round(calculateTotal(products) * 100),
      currency: 'cad',
      customer: customer.id,
      source: token.card.id,
      description: 'My First Test Charge (created for API docs)',
    }, { idempotencyKey });
    res.status(201).json(charge);
  } catch (error) {
    res.status(500).json({ msg: error.message})
  }
});
