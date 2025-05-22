
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  transparent?: boolean;
  className?: string;
}

const Navbar = ({ transparent = false, className }: NavbarProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const hideAuthButtons = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <nav
      className={cn(
        "w-full py-4 px-4 md:px-8 flex items-center justify-between",
        transparent ? "bg-transparent" : "bg-white shadow-sm",
        className
      )}
    >
      <Link to="/" className="flex items-center">
        <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 3v18" />
            <path d="m14 15 2 2 4-4" />
          </svg>
        </div>
        <span className="font-inter font-bold text-xl text-primary">TaskWhiz</span>
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-gray-700 hover:text-primary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu size={24} />
      </button>
      
      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-6">
        {user && (
          <>
            <Link
              to="/todos"
              className={cn(
                "font-roboto text-sm md:text-base transition-colors",
                isActive('/todos')
                  ? "text-primary font-medium"
                  : "text-gray-700 hover:text-primary"
              )}
            >
              My Todos
            </Link>
            <Link
              to="/summary"
              className={cn(
                "font-roboto text-sm md:text-base transition-colors",
                isActive('/summary')
                  ? "text-primary font-medium"
                  : "text-gray-700 hover:text-primary"
              )}
            >
              Summary
            </Link>
          </>
        )}
        
        {!user && !hideAuthButtons && (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="flex items-center gap-1">
                <UserPlus size={16} />
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        )}
        
        {user && (
          <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-1">
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        )}
      </div>
      
      {/* Mobile navigation - overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-4 transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-inter font-bold text-lg text-primary">TaskWhiz</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {user && (
                <>
                  <Link
                    to="/todos"
                    className={cn(
                      "py-2 px-4 rounded-md",
                      isActive('/todos')
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Todos
                  </Link>
                  <Link
                    to="/summary"
                    className={cn(
                      "py-2 px-4 rounded-md",
                      isActive('/summary')
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Summary
                  </Link>
                </>
              )}
              
              {!user && !hideAuthButtons && (
                <>
                  <Link
                    to="/login"
                    className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="py-2 px-4 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              
              {user && (
                <button
                  className="py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
