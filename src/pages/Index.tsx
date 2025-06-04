
import { TrendingUp, Package, AlertTriangle, DollarSign, ShoppingCart, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import StockChart from "@/components/StockChart";
import InventoryTable from "@/components/InventoryTable";
import NotificationPanel from "@/components/NotificationPanel";
import AIInsights from "@/components/AIInsights";
import AddProductDialog from "@/components/AddProductDialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const metrics = [
    {
      title: "Total Products",
      value: "2,847",
      change: "+12%",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5%",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Total Value",
      value: "$847,320",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Orders Today",
      value: "156",
      change: "+24%",
      icon: ShoppingCart,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const handleCreatePurchaseOrder = () => {
    toast({
      title: "Purchase Order Created",
      description: "A new purchase order has been created and sent to your supplier.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your inventory report has been generated and downloaded.",
    });
  };

  return (
    <Layout 
      title="Stock Management Dashboard" 
      description="Welcome back! Here's your inventory overview."
    >
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{metric.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{metric.change}</span>
                    <span className="text-sm text-slate-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-slate-200 p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StockChart />
            </div>
            <div className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AddProductDialog>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Add New Product
                    </Button>
                  </AddProductDialog>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-200 hover:bg-slate-50"
                    onClick={handleCreatePurchaseOrder}
                  >
                    Create Purchase Order
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-200 hover:bg-slate-50"
                    onClick={handleGenerateReport}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Product SKU-001 restocked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Low stock alert: SKU-045</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">New order #1847 received</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTable />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationPanel />
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
