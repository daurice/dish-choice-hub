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
    <>
      {/* Desktop Navigation - Only show on lg and above */}
      <nav className="hidden lg:block bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={logo}
                alt="The Choice Logo"
                className="h-20 md:h-24 w-auto max-w-[140px] md:max-w-[160px] object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-4 xl:gap-8 flex-wrap">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative text-primary-foreground hover:text-accent transition-all duration-300 font-medium text-sm xl:text-base whitespace-nowrap hover:scale-110",
                    "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                    isActive(link.path) && "text-accent scale-110 after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="accent" size="sm" className="gap-2 flex-shrink-0 hover:scale-105 transition-transform duration-300" asChild>
                <a href="tel:+254723589796">
                  <Phone className="h-4 w-4" />
                  <span className="hidden xl:inline">Call Now</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Header - Only show below lg */}
      <div className="lg:hidden bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={logo}
                alt="The Choice Logo"
                className="h-12 sm:h-14 w-auto max-w-[100px] sm:max-w-[120px] object-contain"
              />
            </Link>

            <div className="flex items-center gap-2">
              {/* Call Now Button */}
              <Button variant="accent" size="sm" className="gap-2" asChild>
                <a href="tel:+254723589796">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Call Now</span>
                </a>
              </Button>

              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="border-t border-primary-foreground/20 bg-primary">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2 rounded-md text-primary-foreground hover:bg-primary-foreground/10 transition-colors font-medium",
                      isActive(link.path) && "bg-accent text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
