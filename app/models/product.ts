import mongoose, { Schema, Document } from 'mongoose';

import { Price } from "./price";

export interface IProduct extends Document{
  title: string;
  price: number;
  available: boolean;
  type: 'Sativa' | 'Indica' | 'Hybrid' | 'Edible' | 'Joint';
  dominant: 'Sativa' | 'Indica';
  thcPercent: { min: number, max: number };
  cbdPercent: { min: number, max: number };
  source: string;
  thcGram?: { min: number, max: number };
  cbdGram?: { min: number, max: number };
  description: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  available: { type: Boolean, required: true },
  dominant: { type: String, required: true },
  thcPercent: { type: Map, required: true },
  cbdPercent: { type: Map, required: true },
  source: { type: String, required: true },
  thcGram: { type: Map, required: false },
  cbdGram: { type: Map, required: false },
  description: { type: String, required: true },
});
export default mongoose.model<IProduct>('Product', ProductSchema)
