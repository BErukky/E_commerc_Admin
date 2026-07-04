export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalProducts: number;
  totalCategories: number;
  lowStockItems: number;
}
