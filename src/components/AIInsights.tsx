
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, AlertTriangle, Target, Lightbulb, Brain, BarChart, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIInsights = () => {
  const { toast } = useToast();

  const insights = [
    {
      id: 1,
      type: "Demand Forecasting",
      title: "High demand expected for Electronics",
      description: "Based on seasonal trends and current market data, electronics category will see 35% increase in next 30 days",
      confidence: 87,
      impact: "High",
      action: "Increase stock levels by 40%",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      type: "Price Optimization",
      title: "Optimize pricing for Wireless Mouse",
      description: "Current price is 12% below market average. Suggested price increase to $39.99 could boost revenue by 18%",
      confidence: 92,
      impact: "Medium",
      action: "Update pricing strategy",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      type: "Anomaly Detection",
      title: "Unusual sales pattern detected",
      description: "USB-C Cable sales dropped 45% this week. Possible supply chain issue or competitor pricing impact",
      confidence: 78,
      impact: "Medium",
      action: "Investigate market conditions",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      type: "Reorder Optimization",
      title: "Smart reorder suggestions available",
      description: "AI recommends reordering 8 products based on lead times, demand patterns, and budget constraints",
      confidence: 94,
      impact: "High",
      action: "Review reorder list",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const predictions = [
    { product: "Wireless Headphones", currentStock: 45, predictedSales: 38, daysToStockout: 12, recommendation: "Reorder 50 units" },
    { product: "Smart Phone Case", currentStock: 8, predictedSales: 15, daysToStockout: 5, recommendation: "Urgent reorder needed" },
    { product: "Laptop Stand", currentStock: 67, predictedSales: 22, daysToStockout: 30, recommendation: "Stock sufficient" },
    { product: "Wireless Mouse", currentStock: 23, predictedSales: 28, daysToStockout: 8, recommendation: "Reorder 35 units" },
  ];

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Impact</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Impact</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Impact</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getStockStatus = (days: number) => {
    if (days <= 7) return "text-red-600";
    if (days <= 14) return "text-orange-600";
    return "text-green-600";
  };

  const handleApplyInsight = (insight: typeof insights[0]) => {
    toast({
      title: "AI Recommendation Applied",
      description: `${insight.action} has been implemented successfully.`,
    });
  };

  const handleActOnPrediction = (prediction: typeof predictions[0]) => {
    toast({
      title: "Action Taken",
      description: `${prediction.recommendation} for ${prediction.product} has been processed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">AI Accuracy</p>
                <p className="text-2xl font-bold text-slate-900">94.2%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Brain className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Predictions</p>
                <p className="text-2xl font-bold text-slate-900">847</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">$12.4K</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Insights</p>
                <p className="text-2xl font-bold text-slate-900">23</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Lightbulb className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                    <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-slate-600">{insight.type}</span>
                      {getImpactBadge(insight.impact)}
                    </div>
                    
                    <h4 className="font-medium text-slate-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500">Confidence Score</span>
                      <span className="text-xs font-medium text-slate-700">{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-1 mb-3" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">{insight.action}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApplyInsight(insight)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Demand Predictions */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Sales Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{prediction.product}</h4>
                    <Badge variant="outline" className="text-xs">
                      {prediction.currentStock} in stock
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Predicted Sales (30d)</p>
                      <p className="font-medium text-slate-900">{prediction.predictedSales} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Days to Stockout</p>
                      <p className={`font-medium ${getStockStatus(prediction.daysToStockout)}`}>
                        {prediction.daysToStockout} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{prediction.recommendation}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleActOnPrediction(prediction)}
                    >
                      Act
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsights;
