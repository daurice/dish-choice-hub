import { Building2, Users, PartyPopper, Utensils, Briefcase, Coffee, Heart, LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices } from "@/hooks/useServices";
import corporateCateringImg from "@/assets/corporate-catering.jpg";
import staffManagementImg from "@/assets/staff_management.jpg";
import socialEventsImg from "@/assets/social-events.jpg";
import cafeImg from "@/assets/cafe.jpg";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  PartyPopper,
  Utensils,
  Briefcase,
  Coffee,
  Heart,
};

const imageMap: Record<string, string> = {
  "/src/assets/corporate-catering.jpg": corporateCateringImg,
  "/src/assets/staff_management.jpg": staffManagementImg,
  "/src/assets/social-events.jpg": socialEventsImg,
  "/src/assets/cafe.jpg": cafeImg,
};

// Helper to get image source - handles both storage bucket URLs and local assets
const getImageSrc = (imagePath: string): string => {
  // If it's a full URL (from storage), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // Otherwise, check if it's a mapped local asset
  return imageMap[imagePath] || imagePath;
};

const Services = () => {
  const { data: services, isLoading } = useServices();

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {services?.map((service) => {
            const Icon = iconMap[service.icon];
            const imageSrc = getImageSrc(service.image_path);
            return (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  {Icon && (
                    <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
