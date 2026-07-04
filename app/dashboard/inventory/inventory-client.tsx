"use client";

import { useState } from "react";
import { Search, RefreshCcw, AlertTriangle, CheckCircle, XCircle, TrendingDown, TrendingUp } from "lucide-react";

type Product = {
  _id: string;
  id?: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  image: string;
  updatedAt?: string;
};

function getStockStatus(stock: number, minStock: number) {
  if (stock === 0) return { label: "Out of Stock", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle };
  if (stock < minStock) return { label: "Low Stock", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: AlertTriangle };
  return { label: "In Stock", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle };
}

function StockBar({ stock, min, max }: { stock: number; min: number; max: number }) {
  const safeMax = max > 0 ? max : 100;
  const pct = Math.min((stock / safeMax) * 100, 100);
  const color = stock === 0 ? "bg-red-500" : stock < min ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400 w-8 text-right">{stock}</span>
    </div>
  );
}

export default function InventoryClient({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  const inventory = initialProducts.map(p => ({
    ...p,
    id: p._id || p.id,
    trend: "stable", // Mock trend for now
    lastUpdated: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "Recently",
  }));

  const outOfStock = inventory.filter(i => i.stock === 0).length;
  const lowStock = inventory.filter(i => i.stock > 0 && i.stock < i.minStock).length;
  const inStock = inventory.filter(i => i.stock >= i.minStock).length;

  const filtered = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true :
      filter === "low" ? (item.stock > 0 && item.stock < item.minStock) :
      filter === "out" ? item.stock === 0 : true;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">Track and update stock quantities.</p>
        </div>
        <button className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm self-start sm:self-auto" onClick={() => window.location.reload()}>
          <RefreshCcw className="w-4 h-4" />
          Sync Inventory
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => setFilter("all")} className={`p-4 rounded-xl border text-left transition-all ${filter === "all" ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}`}>
          <div className={`text-2xl font-bold ${filter === "all" ? "" : "text-zinc-900 dark:text-zinc-100"}`}>{inventory.length}</div>
          <div className={`text-xs mt-0.5 ${filter === "all" ? "opacity-75" : "text-zinc-500 dark:text-zinc-400"}`}>Total Items</div>
        </button>
        <button onClick={() => setFilter("low")} className={`p-4 rounded-xl border text-left transition-all ${filter === "low" ? "border-amber-500 bg-amber-500 text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-200 dark:hover:border-amber-900"}`}>
          <div className={`text-2xl font-bold ${filter === "low" ? "" : "text-amber-600 dark:text-amber-400"}`}>{lowStock}</div>
          <div className={`text-xs mt-0.5 ${filter === "low" ? "opacity-75" : "text-zinc-500 dark:text-zinc-400"}`}>Low Stock</div>
        </button>
        <button onClick={() => setFilter("out")} className={`p-4 rounded-xl border text-left transition-all ${filter === "out" ? "border-red-500 bg-red-500 text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900"}`}>
          <div className={`text-2xl font-bold ${filter === "out" ? "" : "text-red-600 dark:text-red-400"}`}>{outOfStock}</div>
          <div className={`text-xs mt-0.5 ${filter === "out" ? "opacity-75" : "text-zinc-500 dark:text-zinc-400"}`}>Out of Stock</div>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
        <input
          type="search"
          placeholder="Search by product name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
        />
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
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Stock Level</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Trend</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                <th className="text-left px-4 py-3.5 font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map(item => {
                const status = getStockStatus(item.stock, item.minStock);
                const StatusIcon = status.icon;
                return (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg flex-shrink-0">{item.image}</div>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs hidden md:table-cell">{item.sku}</td>
                    <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400 hidden lg:table-cell">{item.category}</td>
                    <td className="px-4 py-4 min-w-[140px]">
                      <StockBar stock={item.stock} min={item.minStock} max={item.maxStock} />
                      <p className="text-xs text-zinc-400 mt-1">Min: {item.minStock}</p>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {item.trend === "up" && <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs"><TrendingUp className="w-3.5 h-3.5" /> Up</div>}
                      {item.trend === "down" && <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs"><TrendingDown className="w-3.5 h-3.5" /> Down</div>}
                      {item.trend === "stable" && <div className="text-xs text-zinc-400">— Stable</div>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-zinc-400 text-xs hidden lg:table-cell">{item.lastUpdated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
              <p className="font-medium">No items match your filter</p>
              <p className="text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
        <div className="px-6 py-3.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>Showing {filtered.length} of {inventory.length} items</span>
          <span className="text-xs">{inStock} in stock · {lowStock} low · {outOfStock} out</span>
        </div>
      </div>
    </div>
  );
}
