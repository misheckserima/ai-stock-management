// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import React Query for managing data
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import routing components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Analytics from "./pages/Analytics";
import Warehouse from "./pages/Warehouse";
import Reports from "./pages/Reports";
import Sales from "./pages/Sales";
import AITools from "./pages/AITools";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a new Query Client for data management
const queryClient = new QueryClient();

// Main App component that sets up the entire application
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notifications for user feedback */}
      <Toaster />
      <Sonner />

      {/* Set up routing for the app */}
      <BrowserRouter>
        <Routes>
          {/* Main dashboard page */}
          <Route path="/" element={<Index />} />

          {/* Information pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Main features */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* 404 page for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
