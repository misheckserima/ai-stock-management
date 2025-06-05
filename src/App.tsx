// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
// Removed: import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Removed: import { AlertCircle } from "lucide-react";
// Removed: import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./components/ui/alert-dialog";
import { useIsMobile } from "./hooks/use-mobile";

// Removed: Custom hook to detect mobile devices (replaced by useIsMobile from hooks)
// Removed: const useMobileDetection = () => {
// Removed:   const [isMobile, setIsMobile] = useState(false);
// Removed:   useEffect(() => {
// Removed:     const checkIfMobile = () => {
// Removed:       setIsMobile(window.innerWidth < 768);
// Removed:     };
// Removed:     checkIfMobile();
// Removed:     window.addEventListener('resize', checkIfMobile);
// Removed:     return () => window.removeEventListener('resize', checkIfMobile);
// Removed:   }, []);
// Removed:   return { isMobile };
// Removed: };

// Removed: Mobile Alert Component - Shows a toast notification on mobile devices (replaced by AlertDialog)
// Removed: const MobileAlert = () => {
// Removed:   const { toast } = useToast();
// Removed:   useEffect(() => {
// Removed:     toast({
// Removed:       title: "📱 Mobile Device Detected",
// Removed:       description: "For the best experience, please use a desktop computer or enable 'Desktop Site' in your mobile browser settings.",
// Removed:       variant: "destructive",
// Removed:       duration: 10000, // Show for 10 seconds
// Removed:     });
// Removed:   }, [toast]);
// Removed:   return null; // Don't render anything, just show the toast
// Removed: };

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
  const isMobile = useIsMobile(); // Use the hook from src/hooks/use-mobile

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast notifications for user feedback */}
        <Toaster />
        <Sonner />

        {/* Show mobile alert dialog if on mobile */}
        {isMobile && (
          <AlertDialog open={isMobile} onOpenChange={() => { /* Prevent closing */ }}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mobile Device Not Supported</AlertDialogTitle>
                <AlertDialogDescription>
                  This application is not optimized for mobile devices. Please switch to a desktop browser for the best experience.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => { /* Optionally, add logic to redirect or simply acknowledge */ }}>
                  Got It
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

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

// Removed: Duplicate App function declaration
// Removed: function App() {
// Removed:   const isMobile = useIsMobile();
// Removed:   return (
// Removed:     <div className="App">
// Removed:       {isMobile && (
// Removed:         <AlertDialog open={isMobile} onOpenChange={() => { /* Prevent closing */ }}>
// Removed:           <AlertDialogContent>
// Removed:             <AlertDialogHeader>
// Removed:               <AlertDialogTitle>Mobile Device Not Supported</AlertDialogTitle>
// Removed:               <AlertDialogDescription>
// Removed:                 This application is not optimized for mobile devices. Please switch to a desktop browser for the best experience.
// Removed:               </AlertDialogDescription>
// Removed:             </AlertDialogHeader>
// Removed:             <AlertDialogFooter>
// Removed:               <AlertDialogAction onClick={() => { /* Optionally, add logic to redirect or simply acknowledge */ }}>
// Removed:                 Got It
// Removed:               </AlertDialogAction>
// Removed:             </AlertDialogFooter>
// Removed:           </AlertDialogContent>
// Removed:         </AlertDialog>
// Removed:       )}
// Removed:       <Layout>
// Removed:         <Routes>
// Removed:           {/* Main dashboard page */}
// Removed:           <Route path="/" element={<Index />} />
// Removed:           {/* Information pages */}
// Removed:           <Route path="/about" element={<About />} />
// Removed:           <Route path="/contact" element={<Contact />} />
// Removed:           {/* Main features */}
// Removed:           <Route path="/inventory" element={<Inventory />} />
// Removed:           <Route path="/orders" element={<Orders />} />
// Removed:           <Route path="/suppliers" element={<Suppliers />} />
// Removed:           <Route path="/analytics" element={<Analytics />} />
// Removed:           <Route path="/warehouse" element={<Warehouse />} />
// Removed:           <Route path="/reports" element={<Reports />} />
// Removed:           <Route path="/sales" element={<Sales />} />
// Removed:           <Route path="/ai-tools" element={<AITools />} />
// Removed:           <Route path="/notifications" element={<Notifications />} />
// Removed:           <Route path="/settings" element={<Settings />} />
// Removed:           {/* 404 page for unknown routes */}
// Removed:           <Route path="*" element={<NotFound />} />
// Removed:         </Routes>
// Removed:       </Layout>
// Removed:     </div>
// Removed:   );
// Removed: }

export default App;
