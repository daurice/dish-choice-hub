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
              ChefLink Caterers Limited is a team of dedicated, artistic and culturally inspired chefs who provide
              exceptional food and beverage services. At ChefLink, we help numerous successful companies inspire
              employees every week and grow healthy workplaces.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              We have a multifaceted reputation for providing daily meals, running company canteens, preparing offsite
              meals from our fully equipped kitchen and transforming company events through our exceptional, delicious
              and affordable meals.
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
