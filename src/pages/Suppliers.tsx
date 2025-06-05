
import Layout from "@/components/Layout";
import AddSupplierDialog from "@/components/AddSupplierDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus, Mail, Phone } from "lucide-react";

const Suppliers = () => {
  const supplierStats = [
    { label: "Total Suppliers", value: "124", color: "text-blue-600" },
    { label: "Active", value: "98", color: "text-green-600" },
    { label: "Pending", value: "15", color: "text-orange-600" },
    { label: "Inactive", value: "11", color: "text-red-600" },
  ];

  const suppliers = [
    { 
      id: "SUP-001", 
      name: "TechCorp Solutions", 
      email: "contact@techcorp.com", 
      phone: "+1 234-567-8900", 
      status: "Active",
      products: 45,
      lastOrder: "2024-01-10"
    },
    { 
      id: "SUP-002", 
      name: "Global Electronics", 
      email: "sales@globalelec.com", 
      phone: "+1 234-567-8901", 
      status: "Active",
      products: 78,
      lastOrder: "2024-01-08"
    },
    { 
      id: "SUP-003", 
      name: "Supply Chain Ltd", 
      email: "info@supplychain.com", 
      phone: "+1 234-567-8902", 
      status: "Pending",
      products: 23,
      lastOrder: "2024-01-05"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout 
      title="Supplier Management" 
      description="Manage your supplier relationships and contacts"
    >
      <div className="space-y-6">
        {/* Supplier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {supplierStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Users className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <AddSupplierDialog />
        </div>

        {/* Suppliers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="border-slate-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.id}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(supplier.status)}>
                    {supplier.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{supplier.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Products: {supplier.products}</span>
                    <span className="text-slate-600">Last Order: {supplier.lastOrder}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Suppliers;
