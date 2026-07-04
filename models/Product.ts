import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku: string;
  category: string; // Storing category name for simplicity
  price: number;
  stock: number;
  minStock: number;
  maxStock: number;
  status: string; // "Active", "Draft", etc.
  rating: number;
  image: string; // URL or emoji
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    minStock: { type: Number, required: true, default: 10 },
    maxStock: { type: Number, required: true, default: 100 },
    status: { type: String, required: true, default: "Active" },
    rating: { type: Number, default: 0 },
    image: { type: String, default: "📦" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
