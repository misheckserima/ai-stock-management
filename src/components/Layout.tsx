import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Define what props the Layout component accepts
interface LayoutProps {
  children: React.ReactNode;  // The content to display
  title: string;             // Page title
  description?: string;      // Optional page description
}

// Define what a search result looks like
interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'order' | 'supplier';
  sku?: string;
  status?: string;
}

// Component that handles the main content area
function MainContent({ children, title, description }: LayoutProps) {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const isMobile = useIsMobile();
  
  // Get sidebar state to adjust layout
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showResults) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showResults]);

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Example search results (replace with real search later)
    const mockResults: SearchResult[] = [
      { id: '1', name: 'Product 1', type: 'product', sku: 'SKU001' },
      { id: '2', name: 'Order #1234', type: 'order', status: 'Pending' },
      { id: '3', name: 'Supplier ABC', type: 'supplier' }
    ];
    setSearchResults(mockResults);
  };

  // Render search results
  const renderSearchResults = () => {
    if (!showResults || searchResults.length === 0) return null;
    
    return (
      <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg border border-border">
        <div className="py-1">
          {searchResults.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="px-4 py-2 hover:bg-secondary/50 cursor-pointer flex items-center justify-between gap-2"
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium text-foreground truncate">{result.name}</div>
                {result.sku && (
                  <div className="text-sm text-muted-foreground truncate">{result.sku}</div>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                result.type === 'product' ? 'bg-primary/20 text-primary-foreground' :
                result.type === 'order' ? 'bg-warning/20 text-warning-foreground' :
                'bg-success/20 text-success-foreground'
              }`}>
                {result.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const { state: sidebarState } = useSidebar();
  const sidebarCollapsed = sidebarState === "collapsed";
  const isMobileView = useIsMobile();

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen w-full">
      {/* Top header with search and mobile menu - now handled by AppSidebar */}
      
      {/* Main content area with horizontal scrolling */}
      <main 
        className={cn(
          "flex-1 bg-white overflow-x-auto transition-all duration-300",
          !isMobileView && (sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[220px]"),
          isMobileView ? "pt-16" : ""
        )}
        style={{
          width: isMobileView ? '100%' : sidebarCollapsed ? 'calc(100% - 72px)' : 'calc(100% - 220px)'
        }}
      >
        <div className="min-w-max w-full">
          <div className="min-h-[calc(100vh-4rem)] w-full">
            <div className="container mx-auto px-4 py-6 w-full">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main Layout component that wraps everything
const Layout = (props: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen bg-white w-full">
        {/* Sidebar navigation */}
        <AppSidebar />
        {/* Main content area */}
        <MainContent {...props} />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

