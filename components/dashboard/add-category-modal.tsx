"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { addCategory } from "@/app/actions/category-actions";

type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await addCategory(formData);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Something went wrong");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">Add New Category</h2>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-200 dark:border-red-900">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="e.g. Electronics" />
            </div>
            
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="slug" className="text-sm font-medium">Slug</label>
              <input type="text" id="slug" name="slug" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="e.g. electronics" />
            </div>

            <div className="space-y-1.5 col-span-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea id="description" name="description" required rows={2} className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="Category description..." />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="color" className="text-sm font-medium">Theme Color (Hex)</label>
              <input type="text" id="color" name="color" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="#3b82f6" defaultValue="#3b82f6" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="icon" className="text-sm font-medium">Icon (Emoji)</label>
              <input type="text" id="icon" name="icon" required className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400" placeholder="💻" defaultValue="📦" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" disabled={isPending}>
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2">
              {isPending ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
