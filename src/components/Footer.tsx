import { Facebook, Twitter, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Choice</h3>
            <p className="text-secondary-foreground/80">
              Hospitality with elegance. Providing exceptional catering services for all your events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-secondary-foreground/80 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#menus" className="text-secondary-foreground/80 hover:text-primary transition-colors">Menus</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>0797 113 113</li>
              <li>0728 054 755</li>
              <li>info@cheflink.co.ke</li>
              <li>Umoja Innercore, Nairobi</li>
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
              <a href="#" className="p-2 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/80">
          <p>&copy; 2024 The Choice Catering Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
