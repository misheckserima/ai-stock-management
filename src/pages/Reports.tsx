
import Layout from "@/components/Layout";
import CreateReportDialog from "@/components/CreateReportDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();

  const reportCategories = [
    { name: "Inventory Reports", count: 8, color: "text-blue-600" },
    { name: "Sales Reports", count: 12, color: "text-green-600" },
    { name: "Financial Reports", count: 6, color: "text-purple-600" },
    { name: "Supplier Reports", count: 4, color: "text-orange-600" },
  ];

  const recentReports = [
    {
      id: "RPT-001",
      name: "Monthly Inventory Summary",
      type: "Inventory",
      generated: "2024-01-15",
      status: "Ready",
      size: "2.4 MB"
    },
    {
      id: "RPT-002",
      name: "Sales Performance Analysis",
      type: "Sales",
      generated: "2024-01-14",
      status: "Ready",
      size: "1.8 MB"
    },
    {
      id: "RPT-003",
      name: "Supplier Performance Review",
      type: "Supplier",
      generated: "2024-01-13",
      status: "Processing",
      size: "0.9 MB"
    },
    {
      id: "RPT-004",
      name: "Financial Statement",
      type: "Financial",
      generated: "2024-01-12",
      status: "Ready",
      size: "3.2 MB"
    },
  ];

  const quickReports = [
    { name: "Low Stock Alert", description: "Products below reorder level" },
    { name: "Top Selling Products", description: "Best performing items this month" },
    { name: "Expired Items", description: "Products past expiry date" },
    { name: "Supplier Performance", description: "Delivery and quality metrics" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleQuickReport = (reportName: string) => {
    toast({
      title: "Generating Report",
      description: `${reportName} is being generated. You'll be notified when it's ready.`,
    });
  };

  const handleDownload = (reportName: string) => {
    toast({
      title: "Download Started",
      description: `${reportName} download has started.`,
    });
  };

  return (
    <Layout 
      title="Reports & Analytics" 
      description="Generate and manage business reports"
    >
      <div className="space-y-6">
        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reportCategories.map((category, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{category.name}</p>
                    <p className={`text-2xl font-bold ${category.color}`}>{category.count}</p>
                  </div>
                  <FileText className={`w-8 h-8 ${category.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reports */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Generate instant reports with one click</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{report.name}</p>
                    <p className="text-sm text-slate-600">{report.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickReport(report.name)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your generated reports and downloads</CardDescription>
              </div>
              <CreateReportDialog />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{report.name}</p>
                      <p className="text-sm text-slate-600">
                        {report.type} • Generated on {report.generated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">{report.size}</span>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    {report.status === "Ready" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(report.name)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
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

export default Reports;
