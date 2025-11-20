import { Helmet } from "react-helmet";
import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery - The Choice Catering Services</title>
        <meta name="description" content="View our gallery showcasing beautifully presented dishes, event setups, and satisfied clients. Get inspired for your next event." />
        <meta name="keywords" content="catering gallery, food photos, event photos, catering portfolio" />
      </Helmet>
      <Gallery />
    </>
  );
}
