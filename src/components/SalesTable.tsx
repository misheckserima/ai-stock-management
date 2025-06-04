import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, DollarSign } from "lucide-react";

interface SaleRecord {
  id: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customer: string;
  paymentMethod: string;
  date: string;
  status: string;
}

const SalesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock sales data
  const [salesData] = useState<SaleRecord[]>([
    {
      id: "SALE-001",
      product: "Wireless Bluetooth Headphones",
      quantity: 2,
      unitPrice: 89.99,
      total: 179.98,
      customer: "Charles Moyo",
      paymentMethod: "Credit Card",
      date: "2024-03-01",
      status: "Completed",
    },
    {
      id: "SALE-002",
      product: "Smart Phone Case",
      quantity: 5,
      unitPrice: 24.99,
      total: 124.95,
      customer: "Tendai Nyoni",
      paymentMethod: "Cash",
      date: "2024-03-02",
      status: "Processing",
    },
    {
      id: "SALE-003",
      product: "Laptop Stand",
      quantity: 1,
      unitPrice: 45.50,
      total: 45.50,
      customer: "Lisah Chuma",
      paymentMethod: "Debit Card",
      date: "2024-03-03",
      status: "Pending",
    },
    {
      id: "SALE-004",
      product: "Wireless Mouse",
      quantity: 3,
      unitPrice: 35.00,
      total: 105.00,
      customer: "Sarah Wilson",
      paymentMethod: "Mobile Payment",
      date: "2024-01-14",
      status: "Processing",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "Processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Processing
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        );
    }
  };

  const filteredSales = salesData.filter(sale =>
    sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Sales Records</CardTitle>
            <p className="text-slate-600 mt-1">Track all sales transactions and revenue</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
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
              placeholder="Search sales, customers, or products..."
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
                <th className="text-left py-3 px-4 font-medium text-slate-600">Sale ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Unit Price</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Total</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <code className="bg-slate-100 px-2 py-1 rounded text-sm text-slate-700">
                      {sale.id}
                    </code>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900">{sale.product}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{sale.customer}</td>
                  <td className="py-4 px-4 font-medium text-slate-900">{sale.quantity}</td>
                  <td className="py-4 px-4 font-medium text-slate-900">${sale.unitPrice.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-600">{sale.total.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{sale.paymentMethod}</td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{sale.date}</td>
                  <td className="py-4 px-4">
                    {getStatusBadge(sale.status)}
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

export default SalesTable;
