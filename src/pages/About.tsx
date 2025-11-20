import { Helmet } from "react-helmet";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - The Choice Catering Services</title>
        <meta name="description" content="Learn about The Choice Catering Services, our mission, values, and commitment to providing exceptional catering experiences for every occasion." />
        <meta name="keywords" content="about us, catering company, our story, catering mission" />
      </Helmet>
      <About />
    </>
  );
}
