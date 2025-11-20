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
                    "text-primary-foreground hover:text-accent transition-colors font-medium text-sm xl:text-base whitespace-nowrap",
                    isActive(link.path) && "text-accent border-b-2 border-accent pb-1"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="accent" size="sm" className="gap-2 flex-shrink-0" asChild>
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

            {/* Call Now Button */}
            <Button variant="accent" size="sm" className="gap-2" asChild>
              <a href="tel:+254723589796">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
