import { Building2, Users, PartyPopper, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import corporateImage from "@/assets/corporate-catering.jpg";
import socialImage from "@/assets/social-events.jpg";
import staffImage from "@/assets/staff-canteen.jpg";

const services = [
  {
    icon: Building2,
    title: "Corporate Catering",
    description: "Professional catering solutions for business meetings, conferences, and corporate events.",
    image: corporateImage,
  },
  {
    icon: Users,
    title: "Staff Breakfast & Lunch",
    description: "Daily meal services to keep your team energized and productive throughout the day.",
    image: null,
  },
  {
    icon: PartyPopper,
    title: "Social Events",
    description: "Make your weddings, birthdays, and celebrations memorable with our exquisite catering.",
    image: socialImage,
  },
  {
    icon: Utensils,
    title: "Staff Canteen Management",
    description: "Complete canteen management services for your organization's dining facilities.",
    image: staffImage,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From corporate events to social gatherings, we deliver excellence in every dish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            >
              {service.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
