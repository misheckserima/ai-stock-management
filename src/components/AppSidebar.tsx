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
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./ui/sidebar";

const menuItems = [
  { name: "Dashboard", path: "/", icon: BarChart3, isBlue: true },
  { name: "Inventory", path: "/inventory", icon: Package },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "Sales & Revenue", path: "/sales", icon: DollarSign },
  { name: "Suppliers", path: "/suppliers", icon: Users },
  { name: "Analytics", path: "/analytics", icon: TrendingUp, isBlue: true },
  { name: "Warehouse", path: "/warehouse", icon: Warehouse },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "AI Tools", path: "/ai-tools", icon: Zap, isBlue: true },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, setState } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-full bg-white border-r border-[#ff69b4]/10",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[220px]"
      )}
    >
      {/* Logo and Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-[#ff69b4]/10">
        <div className="flex items-center gap-2">
          <img src="/2pal.svg" alt="2Pal Logo" className="w-8 h-8" />
          {!isCollapsed && (
            <span className="font-bold text-[#1E1E2D]">AI StockWise</span>
          )}
        </div>
        <button
          onClick={() => setState(isCollapsed ? "expanded" : "collapsed")}
          className="p-1.5 rounded-lg hover:bg-[#ff69b4]/10 text-[#ff69b4]"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative group",
                  item.isBlue ? "hover:bg-[#87CEEB]/10" : "hover:bg-[#ff69b4]/10",
                  isActive
                    ? item.isBlue 
                      ? "text-[#87CEEB] bg-[#87CEEB]/10"
                      : "text-[#ff69b4] bg-[#ff69b4]/10"
                    : "text-[#1E1E2D] hover:text-[" + (item.isBlue ? "#87CEEB" : "#ff69b4") + "]"
                )
              }
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.name}</span>}
              {/* Hover glow effect */}
              <span
                className={cn(
                  "absolute inset-0 rounded-lg -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                  item.isBlue ? "bg-[#87CEEB] blur-sm" : "bg-[#ff69b4] blur-sm"
                )}
              />
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#ff69b4]/10">
        <div className="flex items-center gap-3">
          <img
            src="/profile.JPG"
            alt="Misheck Serima"
            className="w-8 h-8 rounded-full border border-[#ff69b4]/20 object-cover"
          />
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-[#1E1E2D] truncate">
                Misheck Serima
              </div>
              <div className="text-xs text-[#1E1E2D]/70 truncate">
                support@aistockwise.com
              </div>
            </div>
          )}
        </div>
        <button
          className="mt-4 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E1E2D]/70 hover:text-[#ff69b4] hover:bg-[#ff69b4]/10 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
