import { Helmet } from "react-helmet";
import MenuSelection from "@/components/MenuSelection";

export default function MenuPage() {
  return (
    <>
      <Helmet>
        <title>Sample Menus - The Choice Catering Services</title>
        <meta name="description" content="Browse our diverse menu selections featuring appetizers, main courses, desserts, and beverages. Customizable options for every taste and occasion." />
        <meta name="keywords" content="catering menu, food menu, event menu, appetizers, main courses, desserts" />
      </Helmet>
      <MenuSelection />
    </>
  );
}
