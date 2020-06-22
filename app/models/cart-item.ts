import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document{
  id: string;
  price: number;
  quantity: number;
  source: string;
  title: string;
}

const CartItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  source: { type: String, required: true },
  title: { type: String, required: true }
});

export default mongoose.model<ICartItem>('CartItemSchema', CartItemSchema)
