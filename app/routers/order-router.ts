import Order from './../models/order';
import { Router } from 'express';
import { isAuth } from '../utils';

export const orderRouter = Router();

orderRouter.post('/create', isAuth, async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(200).json({ data: newOrder })
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});

orderRouter.get('/get-orders/:userId', isAuth, async (req, res) => {
  const customerId = req.params.userId;
  try {
    const orders = await Order.find({ customerId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
})