import { Router } from 'express';

import Product from './../models/product';
import { isAuth, isAdmin } from '../utils';

export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find({});

  try {
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRouter.post('/product', isAuth, isAdmin, async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).send({ msg: 'New product created', data: newProduct });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
});

productRouter.patch('/update', isAuth, isAdmin, async (req, res) => {
  const product = req.body;
  try {
    const updatedProduct = await Product.updateOne({ _id: product._id }, { $set: { ...product }});
    res.status(200).send({msg: 'Product updated', data: updatedProduct});
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
  
})

productRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    await Product.findByIdAndDelete({ _id});
    res.status(200).send('Product deleted');
  } catch (error) {
    console.log('error > ', error);
    res.status(500).send(error)
  }
})


productRouter.get('/indica', async (req, res) => {
  const products = await Product.find({ dominant: 'Indica' })

  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ msg: 'Indicas not found' })
  }
});

productRouter.get('/sativa', async (req, res) => {
  const products = await Product.find({dominant: 'Sativa'})
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ msg: 'Sativas not found' })
  }
});

productRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: 'product not found' })
  }
});