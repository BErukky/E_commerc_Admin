"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home & Garden", value: 300 },
  { name: "Sports", value: 200 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export function CategoryPieChart() {
  return (
    <div className="w-full h-[350px]">
      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-semibold tracking-tight">Sales by Category</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Distribution of products sold across categories.</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: '#ffffff' }}
            formatter={(value: number) => [`${value} items`, 'Sales']}
          />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
