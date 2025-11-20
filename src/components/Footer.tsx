import { Facebook, Twitter, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Choice</h3>
            <p className="text-secondary-foreground/80">
              Every bite a delight. Providing exceptional catering services for all your events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Menus
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <a href="tel:+254723589796" className="hover:text-primary transition-colors">
                  +254 723 589796
                </a>
              </li>
              <li>
                <a href="mailto:vintabsolutions16@gmail.com" className="hover:text-primary transition-colors">
                  vintabsolutions16@gmail.com
                </a>
              </li>
              <li>Along Moi Avenue road, Naivasha Kenya</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="tel:+254723589796" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/80">
          <p>&copy; 2025 The Choice Catering Services. All rights reserved. Designed by <a href="https://mugahdeeptech.net/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">MugahDeepTech</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
