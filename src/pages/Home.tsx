import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The Choice Catering Services - Every Bite a Delight</title>
        <meta name="description" content="Premium catering services for all your events. From corporate functions to weddings, we make every occasion special with our exceptional cuisine and service." />
        <meta name="keywords" content="catering, event catering, corporate catering, wedding catering, food service" />
      </Helmet>
      <Hero />
    </>
  );
}
