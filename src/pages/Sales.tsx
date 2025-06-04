
import Layout from "@/components/Layout";
import SalesTable from "@/components/SalesTable";
import AddSaleDialog from "@/components/AddSaleDialog";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import RevenueChart from "@/components/RevenueChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, Calculator, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Sales = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  // Mock data - in real app this would come from database
  const [monthlyData] = useState({
    totalRevenue: 45280.50,
    totalExpenses: 28150.75,
    profit: 17129.75,
    totalSales: 156,
    averageOrderValue: 290.26
  });

  const revenueStats = [
    { 
      label: "Total Revenue", 
      value: `$${monthlyData.totalRevenue.toLocaleString()}`, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      icon: DollarSign,
      change: "+12.5%"
    },
    { 
      label: "Total Expenses", 
      value: `$${monthlyData.totalExpenses.toLocaleString()}`, 
      color: "text-red-600", 
      bgColor: "bg-red-50",
      icon: TrendingDown,
      change: "+3.2%"
    },
    { 
      label: "Net Profit", 
      value: `$${monthlyData.profit.toLocaleString()}`, 
      color: monthlyData.profit > 0 ? "text-green-600" : "text-red-600", 
      bgColor: monthlyData.profit > 0 ? "bg-green-50" : "bg-red-50",
      icon: TrendingUp,
      change: "+28.4%"
    },
    { 
      label: "Total Sales", 
      value: monthlyData.totalSales.toString(), 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      icon: Calculator,
      change: "+15.8%"
    },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Monthly Report Generated",
      description: `Profit/Loss report for ${new Date().toLocaleString('default', { month: 'long' })} has been generated.`,
    });
  };

  return (
    <Layout 
      title="Sales & Revenue Management" 
      description="Track sales, expenses, and calculate profit/loss"
    >
      <div className="space-y-6">
        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {revenueStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profit/Loss Summary */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Monthly Profit/Loss Summary</CardTitle>
                <CardDescription>
                  {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} Financial Overview
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} variant="outline">
                  <Calculator className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700">Revenue</h3>
                <p className="text-3xl font-bold text-green-600">${monthlyData.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700">Expenses</h3>
                <p className="text-3xl font-bold text-red-600">${monthlyData.totalExpenses.toLocaleString()}</p>
              </div>
              <div className={`text-center p-4 rounded-lg ${monthlyData.profit > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className={`text-lg font-semibold ${monthlyData.profit > 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {monthlyData.profit > 0 ? 'Profit' : 'Loss'}
                </h3>
                <p className={`text-3xl font-bold ${monthlyData.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(monthlyData.profit).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <AddSaleDialog />
            <AddExpenseDialog />
          </div>
        </div>

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Sales Table */}
        <SalesTable />
      </div>
    </Layout>
  );
};

export default Sales;
