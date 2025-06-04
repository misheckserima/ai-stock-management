import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// List of navigation items with their paths
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Navbar component for top navigation
export function Navbar() {
  // Get current page location
  const location = useLocation();

  return (
    <nav className="bg-[#f8f8f8] border-b border-[#87CEEB]/10 animate-fadeIn">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Dashboard title and welcome message */}
          <div className="animate-slideIn">
            <h1 className="text-2xl font-bold text-[#87CEEB] mb-1 hover:scale-105 transition-transform">
              Stock Management Dashboard
            </h1>
            <p className="text-[#87CEEB]/70 hover:text-[#87CEEB] transition-colors">
              Welcome back! Here's your inventory overview.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => {
              // Check if this is the current page
              const isActive = location.pathname === item.path;
              
              return (
                <div
                  key={item.name}
                  className={cn(
                    "animate-fadeInDown",
                    "hover:-translate-y-0.5 transition-transform duration-200"
                  )}
                  style={{
                    // Stagger animation delay for each item
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Navigation link with hover effects */}
                  <Link
                    to={item.path}
                    className={cn(
                      "relative text-sm font-medium transition-colors group",
                      isActive ? "text-[#87CEEB]" : "text-[#87CEEB]/70 hover:text-[#87CEEB]"
                    )}
                  >
                    {/* Link text */}
                    <span className="relative z-10">{item.name}</span>

                    {/* Animated underline effect */}
                    <span
                      className={cn(
                        "absolute left-0 bottom-[-4px] h-[2px] bg-[#87CEEB] rounded-full transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />

                    {/* Hover glow effect */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                        "bg-[#87CEEB] blur-md"
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 