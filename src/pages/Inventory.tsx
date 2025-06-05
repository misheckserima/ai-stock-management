
import Layout from "@/components/Layout";
import InventoryTable from "@/components/InventoryTable";
import AddProductDialog from "@/components/AddProductDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Inventory = () => {
  const { toast } = useToast();

  const quickStats = [
    { label: "Total Products", value: "2,847", color: "text-blue-600" },
    { label: "Low Stock", value: "23", color: "text-orange-600" },
    { label: "Out of Stock", value: "5", color: "text-red-600" },
    { label: "Categories", value: "48", color: "text-green-600" },
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your inventory data is being exported to CSV format.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Inventory list has been filtered based on your criteria.",
    });
  };

  return (
    <Layout 
      title="Inventory Management" 
      description="Manage your product inventory and stock levels"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Package className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <AddProductDialog />
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable />
      </div>
    </Layout>
  );
};

export default Inventory;
