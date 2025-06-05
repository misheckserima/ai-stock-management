// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Custom hook to detect mobile devices
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return { isMobile };
};

// Mobile Alert Component
const MobileAlert = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <Alert className="max-w-md bg-white dark:bg-gray-800 shadow-lg">
      <AlertCircle className="h-6 w-6 text-yellow-500" />
      <AlertTitle className="text-lg font-bold">Mobile Not Supported</AlertTitle>
      <AlertDescription className="mt-2">
        <p>This application is optimized for desktop use.</p>
        <p className="mt-2">For the best experience, please access this application from a desktop computer or switch to desktop mode in your mobile browser settings.</p>
      </AlertDescription>
      <button 
        onClick={() => window.close()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Close
      </button>
    </Alert>
  </div>
);

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
const App = () => {
  const { isMobile } = useMobileDetection();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast notifications for user feedback */}
        <Toaster />
        <Sonner />

        {/* Show mobile alert if on mobile */}
        {isMobile && <MobileAlert />}

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
};

export default App;
