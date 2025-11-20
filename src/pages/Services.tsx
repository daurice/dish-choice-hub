import { Helmet } from "react-helmet";
import Services from "@/components/Services";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services - The Choice Catering Services</title>
        <meta name="description" content="Explore our comprehensive catering services including corporate events, weddings, social gatherings, and more. Professional service tailored to your needs." />
        <meta name="keywords" content="catering services, event catering, corporate catering, wedding catering, party catering" />
      </Helmet>
      <Services />
    </>
  );
}
