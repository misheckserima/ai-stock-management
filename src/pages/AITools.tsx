
import Layout from "@/components/Layout";
import AIInsights from "@/components/AIInsights";
import AIChatDialog from "@/components/AIChatDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Brain, TrendingUp, MessageSquare, Eye, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AITools = () => {
  const { toast } = useToast();

  const aiFeatures = [
    {
      name: "Demand Forecasting",
      description: "Predict future demand using historical data",
      icon: TrendingUp,
      status: "Active",
      accuracy: "94%"
    },
    {
      name: "Price Optimization",
      description: "AI-powered pricing recommendations",
      icon: BarChart3,
      status: "Active",
      accuracy: "87%"
    },
    {
      name: "Smart Reordering",
      description: "Automated reorder suggestions",
      icon: Brain,
      status: "Active",
      accuracy: "91%"
    },
    {
      name: "Anomaly Detection",
      description: "Detect unusual patterns in sales",
      icon: Eye,
      status: "Training",
      accuracy: "88%"
    },
  ];

  const chatHistory = [
    {
      question: "What are our top selling products this month?",
      answer: "Your top 3 products are: Wireless Headphones (234 units), Laptop Stand (189 units), USB Cable (156 units)",
      timestamp: "2 hours ago"
    },
    {
      question: "Which items need immediate restocking?",
      answer: "5 items need urgent restocking: Product SKU-045 (2 units left), SKU-128 (1 unit), SKU-234 (0 units)...",
      timestamp: "1 day ago"
    },
    {
      question: "Show me profit margins by category",
      answer: "Electronics: 18.4%, Accessories: 24.1%, Office Supplies: 15.2%, Home & Garden: 21.8%",
      timestamp: "2 days ago"
    },
  ];

  const handleApplyFeature = (featureName: string) => {
    toast({
      title: `${featureName} Applied`,
      description: `${featureName} has been activated and is now processing your data.`,
    });
  };

  return (
    <Layout 
      title="AI Tools & Insights" 
      description="Leverage artificial intelligence for smarter inventory management"
    >
      <div className="space-y-6">
        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      feature.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                    }`}></div>
                    <span className="text-sm text-slate-600">{feature.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">
                      {feature.accuracy} accuracy
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleApplyFeature(feature.name)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Chat Assistant */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>AI Chat Assistant</CardTitle>
                <CardDescription>Ask questions about your inventory in natural language</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Try asking:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
                  <div>"What products are running low?"</div>
                  <div>"Show me this month's best sellers"</div>
                  <div>"Which suppliers deliver fastest?"</div>
                  <div>"Predict next month's demand"</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Recent Conversations</h4>
                {chatHistory.map((chat, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-3">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-slate-900">Q: </span>
                      <span className="text-sm text-slate-700">{chat.question}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-blue-600">A: </span>
                      <span className="text-sm text-slate-600">{chat.answer}</span>
                    </div>
                    <span className="text-xs text-slate-500">{chat.timestamp}</span>
                  </div>
                ))}
              </div>
              
              <AIChatDialog />
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Component */}
        <AIInsights />
      </div>
    </Layout>
  );
};

export default AITools;
