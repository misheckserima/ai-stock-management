import Layout from "@/components/Layout";
import CreateOrderDialog from "@/components/CreateOrderDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Orders = () => {
  const { toast } = useToast();

  const orderStats = [
    { label: "Total Orders", value: "1,247", color: "text-blue-600" },
    { label: "Pending", value: "23", color: "text-orange-600" },
    { label: "Processing", value: "45", color: "text-yellow-600" },
    { label: "Completed", value: "1,179", color: "text-green-600" },
  ];

  const orders = [
    { id: "ORD-001", customer: "Wellington Moyo", status: "Pending", amount: "$234.50", date: "2024-03-01" },
    { id: "ORD-002", customer: "Esther Ndlovu", status: "Processing", amount: "$456.00", date: "2024-03-02" },
    { id: "ORD-003", customer: "Shylet Dube", status: "Completed", amount: "$123.75", date: "2024-03-03" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Order list has been filtered based on your criteria.",
    });
  };

  return (
    <Layout 
      title="Order Management" 
      description="Track and manage customer orders"
    >
      <div className="space-y-6">
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {orderStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <ShoppingCart className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <CreateOrderDialog />
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Recent Orders */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{order.amount}</p>
                      <p className="text-sm text-slate-600">{order.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Orders;
