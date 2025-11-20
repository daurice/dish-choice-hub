import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-secondary text-secondary-foreground sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
        <img
          src="src/assets/logo.png"
          alt="The Choice Logo"
          className="h-24 w-40 object-contain"
        />
        
      </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
              About Us
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("gallery")} className="hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("menus")} className="hover:text-primary transition-colors">
              Sample Menus
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">
              Contact
            </button>
            <Button variant="default" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </div>
          

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-secondary-foreground/10 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              Gallery
            </button>
            
            <button
              onClick={() => scrollToSection("menus")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              Sample Menus
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 hover:bg-secondary-foreground/10 rounded transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
