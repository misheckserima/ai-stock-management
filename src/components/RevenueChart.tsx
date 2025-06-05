
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const RevenueChart = () => {
  // Mock revenue data for the chart
  const revenueData = [
    { day: "Mon", revenue: 1240, expenses: 680, profit: 560 },
    { day: "Tue", revenue: 1650, expenses: 890, profit: 760 },
    { day: "Wed", revenue: 1420, expenses: 720, profit: 700 },
    { day: "Thu", revenue: 1890, expenses: 950, profit: 940 },
    { day: "Fri", revenue: 2100, expenses: 1100, profit: 1000 },
    { day: "Sat", revenue: 2350, expenses: 1200, profit: 1150 },
    { day: "Sun", revenue: 1750, expenses: 850, profit: 900 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Weekly Revenue Trend</CardTitle>
          <CardDescription>Revenue vs Expenses over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis 
                dataKey="day" 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name]}
                labelFormatter={(label) => `Day: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Expenses"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Daily Profit</CardTitle>
          <CardDescription>Net profit by day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis 
                dataKey="day" 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Profit']}
                labelFormatter={(label) => `Day: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="profit" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Profit"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueChart;
