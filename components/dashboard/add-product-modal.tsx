"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { addProduct } from "@/app/actions/product-actions";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; slug: string }[];
};

export function AddProductModal({ isOpen, onClose, categories }: AddProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await addProduct(formData);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Something went wrong");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">Add New Product</h2>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="name" className="text-sm font-medium">Product Name</label>
              <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="e.g. Wireless Headphones" />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="sku" className="text-sm font-medium">SKU</label>
              <input type="text" id="sku" name="sku" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="e.g. WNC-001" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select id="category" name="category" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400">
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="price" className="text-sm font-medium">Price (₦)</label>
              <input type="number" id="price" name="price" step="0.01" min="0" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="299.99" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="stock" className="text-sm font-medium">Initial Stock</label>
              <input type="number" id="stock" name="stock" min="0" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="50" defaultValue="0" />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="minStock" className="text-sm font-medium">Min Stock Alert</label>
              <input type="number" id="minStock" name="minStock" min="0" className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="10" defaultValue="10" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="maxStock" className="text-sm font-medium">Max Stock Capacity</label>
              <input type="number" id="maxStock" name="maxStock" min="1" className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="100" defaultValue="100" />
            </div>
            
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="image" className="text-sm font-medium">Image (Emoji for now)</label>
              <input type="text" id="image" name="image" className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="🎧" defaultValue="📦" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" disabled={isPending}>
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2">
              {isPending ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
