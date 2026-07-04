import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model upon hot reload in development
export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
