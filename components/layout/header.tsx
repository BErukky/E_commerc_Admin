"use client";

import { Bell, Search, User, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useSidebar } from "./sidebar-provider";

export function Header() {
  const { data: session } = useSession();
  const { toggle } = useSidebar();

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button 
          onClick={toggle}
          className="p-2 -ml-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-medium leading-none">{session?.user?.name || 'Admin'}</span>
            <span className="text-xs text-zinc-500 mt-1">{session?.user?.email || 'admin@store.com'}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center border border-zinc-300 dark:border-zinc-700 overflow-hidden">
            {session?.user?.image ? (
              <img src={session.user.image} alt="User Avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-zinc-500" />
            )}
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
