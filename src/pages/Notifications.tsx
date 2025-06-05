
import Layout from "@/components/Layout";
import NotificationPanel from "@/components/NotificationPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Mail, Smartphone } from "lucide-react";

const Notifications = () => {
  const notificationStats = [
    { label: "Total Notifications", value: "156", color: "text-blue-600" },
    { label: "Unread", value: "23", color: "text-orange-600" },
    { label: "Critical Alerts", value: "5", color: "text-red-600" },
    { label: "This Week", value: "47", color: "text-green-600" },
  ];

  const notificationSettings = [
    {
      type: "Low Stock Alerts",
      email: true,
      sms: false,
      push: true,
      description: "Get notified when products are running low"
    },
    {
      type: "Order Updates",
      email: true,
      sms: true,
      push: true,
      description: "Updates on order status and delivery"
    },
    {
      type: "Supplier Notifications",
      email: true,
      sms: false,
      push: false,
      description: "Communication from suppliers"
    },
    {
      type: "System Alerts",
      email: true,
      sms: true,
      push: true,
      description: "Critical system and security alerts"
    },
  ];

  return (
    <Layout 
      title="Notifications Center" 
      description="Manage all your notifications and alerts"
    >
      <div className="space-y-6">
        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {notificationStats.map((stat, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Bell className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notification Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-600" />
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you want to receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {notificationSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{setting.type}</h4>
                    <p className="text-sm text-slate-600 mt-1">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <Badge variant={setting.email ? "default" : "secondary"}>
                        {setting.email ? "On" : "Off"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-slate-500" />
                      <Badge variant={setting.sms ? "default" : "secondary"}>
                        {setting.sms ? "On" : "Off"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <Badge variant={setting.push ? "default" : "secondary"}>
                        {setting.push ? "On" : "Off"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Panel */}
        <NotificationPanel />
      </div>
    </Layout>
  );
};

export default Notifications;
