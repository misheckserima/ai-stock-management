
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const StockChart = () => {
  const data = [
    { month: "Jan", value: 45000, inventory: 2400 },
    { month: "Feb", value: 52000, inventory: 2600 },
    { month: "Mar", value: 48000, inventory: 2300 },
    { month: "Apr", value: 61000, inventory: 2800 },
    { month: "May", value: 55000, inventory: 2500 },
    { month: "Jun", value: 67000, inventory: 2900 },
    { month: "Jul", value: 72000, inventory: 3100 },
    { month: "Aug", value: 69000, inventory: 2950 },
    { month: "Sep", value: 75000, inventory: 3200 },
    { month: "Oct", value: 78000, inventory: 3350 },
    { month: "Nov", value: 82000, inventory: 3400 },
    { month: "Dec", value: 85000, inventory: 3500 },
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl">Stock Movement & Sales</CardTitle>
        <CardDescription>
          Monthly inventory value and sales performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="inventoryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#valueGradient)"
                name="Sales Value ($)"
              />
              <Area
                type="monotone"
                dataKey="inventory"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#inventoryGradient)"
                name="Inventory Count"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
