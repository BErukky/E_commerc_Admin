"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Edit, Trash2, Package } from "lucide-react";
import { AddCategoryModal } from "@/components/dashboard/add-category-modal";

const COLORS = [
  { name: "Blue", hex: "#3b82f6" }, { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" }, { name: "Violet", hex: "#8b5cf6" },
  { name: "Rose", hex: "#f43f5e" }, { name: "Cyan", hex: "#06b6d4" },
  { name: "Orange", hex: "#f97316" }, { name: "Slate", hex: "#64748b" },
];

type Category = {
  _id: string;
  id?: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  productCount?: number;
};

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // We map the incoming categories to ensure they have an ID and a mock product count
  // In a real app, productCount would come from an aggregation query in the DB
  const categories = initialCategories.map(c => ({
    ...c,
    id: c._id || c.id,
    productCount: c.productCount || Math.floor(Math.random() * 50) // Mocking count for now since we don't have relationships yet
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{categories.length} categories</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View toggle */}
          <div className="flex border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900" : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"}`}>Grid</button>
            <button onClick={() => setViewMode("table")} className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "table" ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900" : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"}`}>Table</button>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat._id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: cat.color + "20" }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{cat.name}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">/{cat.slug}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === cat._id ? null : cat._id)}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  {openMenuId === cat._id && (
                    <div className="absolute right-0 top-8 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg py-1 w-36">
                      <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"><Edit className="w-3.5 h-3.5" /> Edit</button>
                      <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 line-clamp-2">{cat.description}</p>
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <Package className="w-3.5 h-3.5" />
                  <span>{cat.productCount} products</span>
                </div>
                <div className="flex gap-1">
                  {COLORS.filter(c => c.hex === cat.color).map(c => (
                    <div key={c.hex} className="w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-medium text-lg">No categories found</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Get started by creating a new category.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <th className="text-left px-6 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Category</th>
                  <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Slug</th>
                  <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Description</th>
                  <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Products</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {categories.map(cat => (
                  <tr key={cat._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: cat.color + "20" }}>{cat.icon}</div>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs hidden md:table-cell">/{cat.slug}</td>
                    <td className="px-4 py-4 text-zinc-500 dark:text-zinc-400 hidden lg:table-cell max-w-xs truncate">{cat.description}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                        <Package className="w-3.5 h-3.5" />
                        {cat.productCount}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="relative flex justify-end">
                        <button onClick={() => setOpenMenuId(openMenuId === cat._id ? null : cat._id)} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openMenuId === cat._id && (
                          <div className="absolute right-0 top-8 z-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg py-1 w-36">
                            <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
                <p className="font-medium">No categories found</p>
                <p className="text-sm mt-1">Get started by creating a new category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
