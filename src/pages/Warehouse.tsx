import Layout from "@/components/Layout";
import AddWarehouseDialog from "@/components/AddWarehouseDialog";
import CreateTransferDialog from "@/components/CreateTransferDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, MapPin, Plus, Truck } from "lucide-react";

const Warehouse = () => {
  const warehouseStats = [
    { label: "Total Warehouses", value: "5", color: "text-blue-600" },
    { label: "Active Locations", value: "4", color: "text-green-600" },
    { label: "Transfer Orders", value: "12", color: "text-orange-600" },
    { label: "Capacity Used", value: "78%", color: "text-purple-600" },
  ];

  const warehouses = [
    {
      id: "WH001",
      name: "Main Warehouse",
      location: "Harare Central",
      capacity: "5000 sqft",
      occupancy: "75%",
      manager: "Tinevimbo Moyo"
    },
    {
      id: "WH002",
      name: "South Branch",
      location: "Bulawayo",
      capacity: "3000 sqft",
      occupancy: "60%",
      manager: "Andrew Sibanda"
    },
    {
      id: "WH-003",
      name: "Distribution Center",
      location: "Chicago, IL",
      capacity: "65%",
      status: "Active",
      products: 756,
      manager: "Mike Davis"
    },
  ];

  const recentTransfers = [
    { id: "TF-001", from: "Main Warehouse", to: "West Coast Hub", items: 45, status: "In Transit" },
    { id: "TF-002", from: "Distribution Center", to: "Main Warehouse", items: 23, status: "Completed" },
    { id: "TF-003", from: "West Coast Hub", to: "Distribution Center", items: 67, status: "Pending" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout 
      title="Warehouse Management" 
      description="Manage warehouse locations and inventory transfers"
    >
      <div className="space-y-6">
        {/* Warehouse Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {warehouseStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Archive className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <AddWarehouseDialog />
            <CreateTransferDialog />
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id} className="border-slate-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {warehouse.location}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(warehouse.status)}>
                    {warehouse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Capacity</span>
                    <span className="text-sm font-medium">{warehouse.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Products</span>
                    <span className="text-sm font-medium">{warehouse.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Manager</span>
                    <span className="text-sm font-medium">{warehouse.manager}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transfers */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>Latest inventory transfers between warehouses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Truck className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{transfer.id}</p>
                      <p className="text-sm text-slate-600">
                        {transfer.from} → {transfer.to}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">{transfer.items} items</span>
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status}
                    </Badge>
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

export default Warehouse;
