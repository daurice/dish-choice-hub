import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/menu", label: "Sample Menus" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Flexible sizing */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="The Choice Logo"
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] object-contain"
            />
          </Link>

          {/* Desktop Navigation - Flexible spacing */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "hover:text-primary transition-colors font-medium text-sm xl:text-base whitespace-nowrap",
                  isActive(link.path) && "text-primary border-b-2 border-primary pb-1"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" size="sm" className="gap-2 flex-shrink-0" asChild>
              <a href="tel:+254723589796">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">Call Now</span>
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary-foreground/10 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Improved layout */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block w-full text-left px-4 py-3 hover:bg-secondary-foreground/10 rounded transition-colors",
                  isActive(link.path) && "bg-secondary-foreground/10 text-primary font-medium border-l-4 border-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full gap-2" 
                asChild
                onClick={() => setIsOpen(false)}
              >
                <a href="tel:+254723589796">
                  <Phone className="h-4 w-4" />
                  Call Now: +254 723 589796
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
