"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Star } from "lucide-react";
import { AddProductModal } from "@/components/dashboard/add-product-modal";

const STATUS_STYLES: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type Product = {
  _id: string;
  id?: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  rating: number;
  image: string;
};

type Category = {
  name: string;
  slug: string;
};

export default function ProductsClient({ initialProducts, categories }: { initialProducts: Product[], categories: Category[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const products = initialProducts.map(p => ({ ...p, id: p._id }));
  const categoryNames = ["All", ...categories.map(c => c.name)];
  
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{products.length} products total</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="search"
            placeholder="Search products or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400 flex-shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto">
            {categoryNames.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900" : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <th className="text-left px-6 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Product</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">SKU</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Category</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Price</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Stock</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Rating</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map(product => (
                <tr key={product._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                        {product.image}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs hidden md:table-cell">{product.sku}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 hidden lg:table-cell">{product.category}</td>
                  <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">₦{product.price.toFixed(2)}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">{product.stock}</td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-zinc-600 dark:text-zinc-400">{product.rating || 0}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[product.status] || STATUS_STYLES["Active"]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenuId === product._id && (
                        <div className="absolute right-0 top-8 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg py-1 w-36">
                          <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
              <p className="font-medium">No products found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
        <div className="px-6 py-3.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>Showing {filtered.length} of {products.length} products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors" disabled>← Prev</button>
            <button className="px-3 py-1 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors" disabled>Next →</button>
          </div>
        </div>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} categories={categories} />
    </div>
  );
}
