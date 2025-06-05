
import Layout from "@/components/Layout";
import StockChart from "@/components/StockChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";

const Analytics = () => {
  return (
    <Layout 
      title="Analytics & Reports" 
      description="Comprehensive analytics and business intelligence"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Revenue Growth</p>
                  <p className="text-2xl font-bold text-green-600">+24.5%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">vs last month</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Stock Turnover</p>
                  <p className="text-2xl font-bold text-blue-600">8.2x</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">Improved</span>
                  </div>
                </div>
                <PieChart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Order Fulfillment</p>
                  <p className="text-2xl font-bold text-purple-600">96.8%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+2.1%</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Profit Margin</p>
                  <p className="text-2xl font-bold text-orange-600">18.4%</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-0.5%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <StockChart />
          </div>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best selling items this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Wireless Headphones", "Laptop Stand", "USB Cable", "Monitor"].map((product, index) => (
                  <div key={product} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{product}</span>
                    <span className="text-sm text-slate-600">{(100 - index * 15)}% sold</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Inventory Health</CardTitle>
              <CardDescription>Stock status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Optimal Stock</span>
                  <span className="text-sm text-green-600">2,245 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Low Stock</span>
                  <span className="text-sm text-orange-600">23 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Out of Stock</span>
                  <span className="text-sm text-red-600">5 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overstock</span>
                  <span className="text-sm text-blue-600">12 items</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
