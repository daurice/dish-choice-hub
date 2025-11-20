import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-us.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const About = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {settings?.about_title || "Who We Are"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={aboutImage} alt="Our professional chef team" className="rounded-lg shadow-xl w-full" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              {settings?.about_text || "We are a professional catering company dedicated to providing exceptional food and service for all your events. From intimate gatherings to large corporate functions, we bring culinary excellence and impeccable service to every occasion."}
            </p>
            <Button variant="outline" size="lg" className="border-2 border-primary hover:bg-accent hover:text-accent-foreground hover:border-accent">
              More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
