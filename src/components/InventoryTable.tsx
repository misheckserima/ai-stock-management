
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Plus, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import EditProductDialog from "./EditProductDialog";
import RestockDialog from "./RestockDialog";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  status: string;
  lastUpdated: string;
}

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "SKU-001",
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      quantity: 45,
      minStock: 10,
      price: 89.99,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "SKU-002",
      name: "Smart Phone Case",
      category: "Accessories",
      quantity: 8,
      minStock: 15,
      price: 24.99,
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: "SKU-003",
      name: "USB-C Cable",
      category: "Accessories",
      quantity: 0,
      minStock: 20,
      price: 12.99,
      status: "Out of Stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: "SKU-004",
      name: "Laptop Stand",
      category: "Office",
      quantity: 67,
      minStock: 25,
      price: 45.50,
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "SKU-005",
      name: "Wireless Mouse",
      category: "Electronics",
      quantity: 23,
      minStock: 30,
      price: 35.00,
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
  ]);

  const handleUpdateProduct = (updatedProduct: InventoryItem) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === updatedProduct.id 
          ? { ...updatedProduct, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const handleRestock = (productId: string, quantity: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === productId 
          ? { 
              ...item, 
              quantity: item.quantity + quantity, 
              lastUpdated: new Date().toISOString().split('T')[0] 
            }
          : item
      )
    );
  };

  const getStatusBadge = (status: string, quantity: number, minStock: number) => {
    if (quantity === 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Out of Stock
        </Badge>
      );
    } else if (quantity <= minStock) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800">
          <Clock className="w-3 h-3" />
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3" />
          In Stock
        </Badge>
      );
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Inventory Management</CardTitle>
            <p className="text-slate-600 mt-1">Manage your product inventory and stock levels</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search products, SKUs, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">SKU</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Last Updated</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900">{item.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <code className="bg-slate-100 px-2 py-1 rounded text-sm text-slate-700">
                      {item.id}
                    </code>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{item.category}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${item.quantity <= item.minStock ? 'text-orange-600' : 'text-slate-900'}`}>
                      {item.quantity}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">/ {item.minStock} min</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900">${item.price}</td>
                  <td className="py-4 px-4">
                    {getStatusBadge(item.status, item.quantity, item.minStock)}
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{item.lastUpdated}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <EditProductDialog 
                        product={item} 
                        onUpdate={handleUpdateProduct}
                      />
                      <RestockDialog 
                        productName={item.name}
                        currentStock={item.quantity}
                        onRestock={(quantity) => handleRestock(item.id, quantity)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
