import { Facebook, Twitter, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">The Choice</h3>
            <p className="text-primary-foreground/80">
              Every bite a delight. Providing exceptional catering services for all your events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Menus
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>
                <a href="tel:+254723589796" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +254 723 589796
                </a>
              </li>
              <li className="break-words">
                <a href="mailto:vintabsolutions16@gmail.com" className="hover:text-accent transition-colors">
                  vintabsolutions16@gmail.com
                </a>
              </li>
              <li>Along Moi Avenue road, Naivasha Kenya</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="tel:+254723589796" 
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/80 text-sm">
          <p>&copy; 2025 The Choice Catering Services. All rights reserved. Designed by{" "}
            <a 
              href="https://mugahdeeptech.net/" 
              className="text-primary hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              MugahDeepTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
