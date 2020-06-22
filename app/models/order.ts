import mongoose, { Schema, Document } from 'mongoose';
import { ICartItem } from './cart-item';
import { ShippingAddress } from './shipping-address';

export interface IOrder extends Document {
  customerId: string;
  customer: string;
  cartItems: ICartItem[];
  date: Date;
  status: string;
  shippingAddress?: ShippingAddress
}

const OrderSchema: Schema = new Schema({
  customerId: { type: String, required: true },
  customer: { type: String, required: true },
  cartItems: Schema.Types.Mixed,
  date: { type: Date, required: true },
  status: { type: String, required: true },
  shippingAddress: { type: Map, required: false }
});

export default mongoose.model<IOrder>('Order', OrderSchema);