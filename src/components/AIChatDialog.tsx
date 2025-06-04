
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatDialogProps {
  children?: React.ReactNode;
}

const AIChatDialog = ({ children }: AIChatDialogProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI inventory assistant. I can help you with questions about your stock, sales trends, and recommendations. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const predefinedResponses = {
    "low stock": "Based on your current inventory, you have 23 items with low stock levels. The top items that need immediate attention are: Wireless Headphones (2 units left), USB-C Cable (1 unit), and Laptop Stand (3 units). Would you like me to create reorder suggestions?",
    "best sellers": "Your top 5 best-selling products this month are: 1) Wireless Headphones (234 units), 2) Laptop Stand (189 units), 3) USB Cable (156 units), 4) Phone Case (134 units), 5) Bluetooth Speaker (128 units). Electronics category is performing exceptionally well!",
    "sales prediction": "Based on historical data and current trends, I predict a 15% increase in sales next month, primarily driven by the electronics category. Holiday season approaching will boost sales by an estimated 25% in November-December.",
    "reorder suggestions": "I recommend reordering the following items: Wireless Headphones (50 units), USB-C Cables (100 units), and Laptop Stands (30 units). Total estimated cost: $2,340. These items have high turnover rates and current stock won't last beyond next week.",
    "profit margins": "Your current profit margins by category: Electronics (18.4%), Accessories (24.1%), Office Supplies (15.2%), Home & Garden (21.8%). Consider increasing prices for Electronics category as demand is high.",
    "default": "I understand you're asking about inventory management. I can help with stock levels, sales analysis, reorder suggestions, profit margins, and demand forecasting. Could you be more specific about what you'd like to know?"
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("low stock") || message.includes("running low")) {
      return predefinedResponses["low stock"];
    } else if (message.includes("best sell") || message.includes("top product")) {
      return predefinedResponses["best sellers"];
    } else if (message.includes("predict") || message.includes("forecast")) {
      return predefinedResponses["sales prediction"];
    } else if (message.includes("reorder") || message.includes("order")) {
      return predefinedResponses["reorder suggestions"];
    } else if (message.includes("profit") || message.includes("margin")) {
      return predefinedResponses["profit margins"];
    } else {
      return predefinedResponses["default"];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Start New Conversation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Inventory Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about your inventory, sales, or get smart recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your inventory..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChatDialog;
