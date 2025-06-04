import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { useState } from 'react';
import { cn } from "@/lib/utils";

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
  
  // Get sidebar state to adjust layout
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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

  return (
    <div className={cn(
      "flex-1 flex flex-col bg-white min-h-screen w-full",
      isCollapsed ? "pl-[72px]" : "pl-[220px]"
    )}>
      {/* Top header with search */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <Navbar />
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              {/* Search box with dropdown results */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search products, orders, suppliers..." 
                    className="pl-10 w-[280px] bg-secondary/50 border-border focus:bg-secondary"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                  />
                </form>
                
                {/* Search results dropdown */}
                {showResults && searchResults.length > 0 && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 bg-white w-full">
        <div className="px-6 py-6 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}

// Main Layout component that wraps everything
const Layout = (props: LayoutProps) => {
  return (
    <SidebarProvider>
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

