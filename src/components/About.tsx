import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-us.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Who We Are</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={aboutImage} alt="Our professional chef team" className="rounded-lg shadow-xl w-full" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              The Choice Cafe is a team of passionate, creative, and culturally inspired chefs dedicated to delivering exceptional food and beverage services. At The Choice, 
              we collaborate with leading organizations to inspire their teams and promote healthy workplaces through quality meals. We are celebrated for our versatility ,offering daily corporate meals, 
              managing company canteens, preparing offsite catering from our fully equipped kitchen, and transforming corporate events with our delicious, affordable, and unforgettable culinary experiences.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              We have earned a strong reputation for delivering daily meals, operating company canteens, preparing offsite dishes from our state-of-the-art kitchen, and creating remarkable dining experiences
               for corporate events with our flavorful and affordable meals.
            </p>
            <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
              More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
