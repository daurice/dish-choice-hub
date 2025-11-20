import { Helmet } from "react-helmet";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - The Choice Catering Services</title>
        <meta name="description" content="Get in touch with The Choice Catering Services. Contact us for inquiries, bookings, or to discuss your event catering needs." />
        <meta name="keywords" content="contact catering, catering inquiry, book catering, catering consultation" />
      </Helmet>
      <Contact />
    </>
  );
}
