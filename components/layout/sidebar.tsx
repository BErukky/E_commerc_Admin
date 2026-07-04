"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tags, Box, Settings, X } from "lucide-react";
import { useSidebar } from "./sidebar-provider";

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  // Helper to check active path
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden backdrop-blur-sm" 
          onClick={close}
        />
      )}
      
      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-shrink-0 flex flex-col h-full
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? "w-64 translate-x-0" 
            : "w-0 -translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:border-r-0 overflow-hidden"
          }
        `}
      >
        <div className="w-64 h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xl font-bold tracking-tight">Admin<span className="text-blue-600 dark:text-blue-500">Dash</span></span>
            <button 
              onClick={close} 
              className="lg:hidden p-2 -mr-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive("/dashboard") ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </Link>
            <Link 
              href="/dashboard/products" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive("/dashboard/products") ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"}`}
            >
              <Package className="w-4 h-4" />
              Products
            </Link>
            <Link 
              href="/dashboard/categories" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive("/dashboard/categories") ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"}`}
            >
              <Tags className="w-4 h-4" />
              Categories
            </Link>
            <Link 
              href="/dashboard/inventory" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive("/dashboard/inventory") ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"}`}
            >
              <Box className="w-4 h-4" />
              Inventory
            </Link>
          </nav>

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900/50 font-medium text-sm transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
