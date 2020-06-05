import { ShippingAddress } from './shipping-address';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  hash: string;
  isAdmin: boolean;
  shippingAddress?: ShippingAddress;
};

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  hash: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  shippingAddress: { type: Map, required: false },
});

export default mongoose.model<IUser>('User', UserSchema);