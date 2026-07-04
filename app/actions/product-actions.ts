"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function addProduct(formData: FormData) {
  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const minStock = parseInt(formData.get("minStock") as string, 10) || 10;
    const maxStock = parseInt(formData.get("maxStock") as string, 10) || 100;
    const image = (formData.get("image") as string) || "📦";

    if (!name || !sku || !category || isNaN(price) || isNaN(stock)) {
      return { success: false, error: "Required fields are missing or invalid" };
    }

    const existing = await Product.findOne({ sku });
    if (existing) {
      return { success: false, error: "Product with this SKU already exists" };
    }

    const newProduct = new Product({
      name,
      sku,
      category,
      price,
      stock,
      minStock,
      maxStock,
      image,
      status: stock > 0 ? "Active" : "Out of Stock",
    });

    await newProduct.save();
    
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/inventory");
    revalidatePath("/dashboard"); // since dashboard has charts
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add product:", error);
    return { success: false, error: error.message || "Failed to add product" };
  }
}
