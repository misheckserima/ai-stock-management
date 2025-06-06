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
  LogOut,
  Menu,
  X
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

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

const SidebarContent = ({ isCollapsed, onNavClick }: { isCollapsed: boolean, onNavClick?: () => void }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Logo and Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-[#ff69b4]/10">
        <div className="flex items-center gap-2">
          <img src="/2pal.svg" alt="2Pal Logo" className="w-8 h-8" />
          {!isCollapsed && (
            <span className="font-bold text-[#1E1E2D]">AI StockWise</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const event = new CustomEvent('toggle-sidebar');
            window.dispatchEvent(event);
          }}
          className="p-1.5 rounded-lg hover:bg-[#ff69b4]/10 text-[#ff69b4] hidden md:block"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative group",
                  item.isBlue ? "hover:bg-[#87CEEB]/10" : "hover:bg-[#ff69b4]/10",
                  isActive
                    ? item.isBlue 
                      ? "text-[#87CEEB] bg-[#87CEEB]/10"
                      : "text-[#ff69b4] bg-[#ff69b4]/10"
                    : "text-[#1E1E2D] hover:[" + (item.isBlue ? "#87CEEB" : "#ff69b4") + "]"
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
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#ff69b4]/10 bg-white">
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
    </>
  );
};

export function AppSidebar() {
  const { 
    state, 
    open, 
    setOpen, 
    openMobile, 
    setOpenMobile, 
    isMobile, 
    toggleSidebar 
  } = useSidebar();
  
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  
  // Close mobile sidebar when location changes
  useEffect(() => {
    setOpenMobile(false);
  }, [location, setOpenMobile]);

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setOpenMobile(!openMobile);
  };
  
  // Handle sidebar toggle from custom event
  useEffect(() => {
    const handleToggleSidebar = () => {
      toggleSidebar();
    };
    
    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [toggleSidebar]);

  // Desktop sidebar
  const desktopSidebar = (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-full bg-white border-r border-[#ff69b4]/10",
        "transition-all duration-300 ease-in-out hidden md:block",
        isCollapsed ? "w-[72px]" : "w-[220px]"
      )}
    >
      <SidebarContent 
        isCollapsed={isCollapsed} 
        onNavClick={() => {}}
      />
      {/* Collapse/Expand button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-[#ff69b4]/20 bg-white shadow-md transition-all hover:bg-[#ff69b4]/10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-[#ff69b4]" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-[#ff69b4]" />
        )}
      </button>
    </aside>
  );
  
  // Calculate main content margin based on sidebar state
  const mainContentStyle = {
    marginLeft: isCollapsed ? '72px' : '220px',
    transition: 'margin-left 300ms ease-in-out',
    width: 'calc(100% - 72px)',
    maxWidth: '100%',
  };

  // Mobile sidebar (drawer)
  const mobileSidebar = (
    <Sheet open={openMobile} onOpenChange={(open) => setOpenMobile(open)}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/2pal.svg" alt="2Pal Logo" className="w-8 h-8" />
              <SheetTitle className="text-lg font-bold">AI StockWise</SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileSidebar}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </SheetHeader>
        <div className="h-full overflow-y-auto">
          <SidebarContent isCollapsed={false} onNavClick={toggleMobileSidebar} />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#ff69b4]/10 z-10 flex items-center px-4 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="ml-2 flex items-center gap-2">
            <img src="/2pal.svg" alt="2Pal Logo" className="w-8 h-8" />
            <span className="font-bold text-[#1E1E2D]">AI StockWise</span>
          </div>
        </header>
      )}
      
      {isMobile ? mobileSidebar : desktopSidebar}
      
      {/* Add padding to main content when on mobile */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        !isMobile && isCollapsed ? "md:pl-[72px]" : !isMobile ? "md:pl-[220px]" : "",
        isMobile ? "pt-16" : ""
      )}>
        {/* This is where the main content will be rendered */}
      </div>
    </>
  );
}
