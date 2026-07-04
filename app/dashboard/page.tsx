import { Package, Tags, Box, TrendingUp } from "lucide-react";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { getProducts } from "@/app/actions/product-actions";
import { getCategories } from "@/app/actions/category-actions";

export const dynamic = 'force-dynamic';

export default async function DashboardOverviewPage() {
  const products = await getProducts();
  const categories = await getCategories();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  
  // Calculate low stock items (stock > 0 but less than minStock)
  // Also can include out of stock (stock === 0) if desired. Let's include everything below minStock
  const lowStockItems = products.filter((p: { stock: number; minStock?: number }) => p.stock < (p.minStock || 10)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome to your store dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₦0.00", icon: TrendingUp },
          { label: "Total Products", value: totalProducts.toLocaleString(), icon: Package },
          { label: "Total Categories", value: totalCategories.toLocaleString(), icon: Tags },
          { label: "Low/Out of Stock", value: lowStockItems.toLocaleString(), icon: Box },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <stat.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6">
          <SalesChart />
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6">
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
}
