
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, TrendingUp, Clock, CheckCircle, Bell, Mail, Smartphone } from "lucide-react";

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      type: "Low Stock",
      title: "Smart Phone Case running low",
      message: "Only 8 units remaining. Reorder level: 15 units",
      time: "2 hours ago",
      priority: "high",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      channels: ["email", "app"],
    },
    {
      id: 2,
      type: "Stock Out",
      title: "USB-C Cable out of stock",
      message: "Product completely out of stock. Immediate reorder required",
      time: "4 hours ago",
      priority: "urgent",
      icon: Package,
      color: "text-red-500",
      bgColor: "bg-red-50",
      channels: ["email", "sms", "app"],
    },
    {
      id: 3,
      type: "AI Insight",
      title: "Demand spike detected",
      message: "Wireless Bluetooth Headphones showing 40% increase in demand",
      time: "6 hours ago",
      priority: "medium",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      channels: ["app"],
    },
    {
      id: 4,
      type: "Expiry Alert",
      title: "Products expiring soon",
      message: "5 products will expire within 30 days",
      time: "1 day ago",
      priority: "medium",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      channels: ["email"],
    },
    {
      id: 5,
      type: "Restock Complete",
      title: "Laptop Stand restocked",
      message: "67 units added to inventory successfully",
      time: "2 days ago",
      priority: "low",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      channels: ["app"],
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="w-3 h-3" />;
      case "sms":
        return <Smartphone className="w-3 h-3" />;
      case "app":
        return <Bell className="w-3 h-3" />;
      default:
        return <Bell className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Alerts</p>
                <p className="text-2xl font-bold text-slate-900">23</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Recent Notifications</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Mark All Read</Button>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                <notification.icon className={`w-5 h-5 ${notification.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900">{notification.type}</span>
                  {getPriorityBadge(notification.priority)}
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{notification.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{notification.time}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500">Sent via:</span>
                    {notification.channels.map((channel, index) => (
                      <div key={index} className="p-1 bg-white rounded border border-slate-200">
                        {getChannelIcon(channel)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Dismiss</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPanel;
