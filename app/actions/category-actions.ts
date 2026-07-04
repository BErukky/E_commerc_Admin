"use server";

import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    await connectDB();
    // Convert Mongoose documents to plain objects so they can be passed to Client Components
    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function addCategory(formData: FormData) {
  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const icon = formData.get("icon") as string;

    if (!name || !slug || !description || !color || !icon) {
      return { success: false, error: "All fields are required" };
    }

    // Check if slug exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return { success: false, error: "Category with this slug already exists" };
    }

    const newCategory = new Category({
      name,
      slug,
      description,
      color,
      icon,
    });

    await newCategory.save();
    
    // Revalidate paths to update the UI
    revalidatePath("/dashboard/categories");
    revalidatePath("/dashboard/products"); // since products form uses categories
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add category:", error);
    return { success: false, error: error.message || "Failed to add category" };
  }
}
