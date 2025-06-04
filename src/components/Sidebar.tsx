import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Warehouse,
  FileText,
  Zap,
  Bell,
  Settings,
  DollarSign,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: BarChart3 },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Sales & Revenue", path: "/sales", icon: DollarSign },
    { name: "Suppliers", path: "/suppliers", icon: Users },
    { name: "Analytics", path: "/analytics", icon: TrendingUp },
    { name: "Warehouse", path: "/warehouse", icon: Warehouse },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "AI Tools", path: "/ai-tools", icon: Zap },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-60">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          StockWise
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your inventory with ease
        </p>
      </div>
      <div className="flex-grow p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-700"
                  )
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@stockwise.com"
            className="text-blue-600 hover:underline"
          >
            support@stockwise.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
